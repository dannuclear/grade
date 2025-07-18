import styled from "@emotion/styled";
import { ClassAutocomplete } from "@features/classes";
import { StudentAutocomplete } from "@features/students/ui";
import { SubjectAutocomplete } from "@features/subjects/ui";
import { TeacherAutocomplete } from "@features/teacher/ui";
import { Grid } from "@mui/material";
import { DataGrid, DataGridProps, GridColDef } from "@mui/x-data-grid";
import { rqClient } from "@shared/api/instance";
import { ApiComponents } from "@shared/api/schema";
import dayjs from "dayjs";
import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "react-router";

const StyledDataGrid = styled(DataGrid)({
    '& .MuiDataGrid-columnHeader': {
        padding: 0.1
    },
    '& .MuiDataGrid-cell': {
        '&.rate-cell': {
            padding: 0.1
        }
    }
});

type PivotDataType = {
    id: number;
    fullName: string;
    [date: string]: number | string;
};

const SvgText = ({ text }: { text?: string }) => (
    <svg width="20" height="80" viewBox="0 0 100 100">
        <text
            x="50"
            y="50"
            fontSize="70px"
            transform="rotate(-90, 50, 50)"
            textAnchor="middle"
            dominantBaseline="middle"
        >
            {text}
        </text>
    </svg>
);

const createColumn = (date: string): GridColDef => ({
    field: date,
    headerName: date,
    width: 30,
    minWidth: 40,
    renderHeader: (p) => <SvgText text={p.colDef.headerName} />,
    sortable: false,
    headerAlign: "center",
    cellClassName: "rate-cell",
    resizable: false,
    align: "center"
});

const baseColumns: GridColDef[] = [
    {
        field: "fullName",
        headerName: "ФИО",
        width: 280,
        headerAlign: "center",
        sortable: false,
        resizable: false
    }
];

function transformData(data: ApiComponents["schemas"]["Grade"][] = []) {
    const result: Record<number, PivotDataType> = {};
    const dates = new Set<string>();

    data?.forEach(item => {
        const student = item.student;
        const key = student?.id as number;
        const fullName = `${student?.surname} ${student?.firstname} ${student?.patronymic}`.trim();
        const date = dayjs(item.dateTime).format("DD.MM.YYYY");

        dates.add(date);

        if (!result[key]) {
            result[key] = { id: key, fullName };
        }
        result[key][date] = (result[key][date] ? (result[key][date] + " " + (item.val ?? "")) : (item.val ?? ""));
    });

    return {
        rows: Object.values(result),
        columns: Array.from(dates)
    };
}

type AutocompleteOption = { id?: number; name?: string };

export const GradeTable = ({ ...props }: Omit<DataGridProps, "columns">) => {
    const [searchParams] = useSearchParams()
    const studentIdParam = searchParams.get("studentId")
    const groupIdParam = searchParams.get("groupId")
    const subjectIdParam = searchParams.get("subjectId")
    const teacherIdParam = searchParams.get("teacherId")

    const [groupId, setGroupId] = useState<number | undefined>(groupIdParam ? parseInt(groupIdParam) : undefined);
    const [studentId, setStudentId] = useState<number | undefined>(studentIdParam ? parseInt(studentIdParam) : undefined);
    const [subjectId, setSubjectId] = useState<number | undefined>(subjectIdParam ? parseInt(subjectIdParam) : undefined);
    const [teacherId, setTeacherId] = useState<number | undefined>(teacherIdParam ? parseInt(teacherIdParam) : undefined);

    const { data } = rqClient.useQuery("get", "/api/v1/grades", {
        params: {
            query: {
                groupId,
                studentId,
                subjectId,
                teacherId
            }
        }
    });

    const pivotData = useMemo(() => transformData(data), [data]);

    const columns = useMemo(() => [
        ...baseColumns,
        ...pivotData.columns.map(createColumn)
    ], [pivotData.columns]);

    const handleChange = useCallback((setter: React.Dispatch<React.SetStateAction<number | undefined>>) =>
        (option: AutocompleteOption | null) => {
            setter(option?.id);
        }, []);

    return (
        <Grid container spacing={2}>
            <Grid size={3}>
                <ClassAutocomplete onChange={(_props, sel) => handleChange(setGroupId)(sel)} />
            </Grid>
            <Grid size={3}>
                <StudentAutocomplete onChange={(_props, sel) => handleChange(setStudentId)(sel)} />
            </Grid>
            <Grid size={3}>
                <TeacherAutocomplete onChange={(_props, sel) => handleChange(setTeacherId)(sel)} />
            </Grid>
            <Grid size={3}>
                <SubjectAutocomplete onChange={(_props, sel) => handleChange(setSubjectId)(sel)} />
            </Grid>
            <Grid size={12}>
                <StyledDataGrid
                    {...props}
                    rows={pivotData.rows}
                    columns={columns}
                    columnHeaderHeight={130}
                    hideFooter
                />
            </Grid>
        </Grid>
    );
};