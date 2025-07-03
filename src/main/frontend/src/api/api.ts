

//const apiUrl = "http://localhost:8080/pfr/api/v1"
export const BASE_URL = `http://${document.location.hostname}:${document.location.port == '5173' ? 8080 : document.location.port}${import.meta.env.BASE_URL}`
const apiUrl = BASE_URL + '/api/v1'

export const claimApi = {
    all: () => {
        return fetch(`${apiUrl}/claim`, { credentials: "include" }).then(response => response.json());
    },
    byId: (id: number) => {
        return fetch(`${apiUrl}/claims/${id}`, { credentials: "include" }).then(response => response.json());
    },
    setStatus: (id: number | string, code: number, comment: string, sum: number) => {
        return fetch(`${apiUrl}/claims/${id}/status`, {
            credentials: "include",
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: code, comment, sum })
        });
    },
    getHistoryByClaim: (claimId: number | string) => {
        return fetch(`${apiUrl}/claims/${claimId}/history`, { credentials: "include" }).then(response => response.json());
    }
}

export const userApi = {
    current: () => {
        return fetch(`${apiUrl}/users/current`, { credentials: "include" }).then(response => response.json());
    },
    byId: (id: number) => {
        return fetch(`${apiUrl}/users/${id}`, { credentials: "include" }).then(response => response.json());
    },
    save: (id: number | null, data: any) => {
        return fetch(`${apiUrl}/users${id ? '/' + id : ''}`, {
            credentials: "include",
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    },
    delete: (id:number)=>{
        return fetch(`${apiUrl}/users/${id}`, {
            credentials: "include",
            method: 'DELETE',
        });
    }
}

export const organizationApi = {
    all: () => {
        return fetch(`${apiUrl}/organizations`, { credentials: "include" }).then(response => response.json());
    }
}