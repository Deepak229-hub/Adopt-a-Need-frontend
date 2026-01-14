const URL = 'https://adopt-a-need.onrender.com';

export const getVoluneers = async (token) => {
    try {
        const response = await fetch(URL + '/api/volunteer/', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        const data = await response.json();
        return {
            ok: response.ok,
            ...data,
        };
    } catch (error) {
        console.log("An error occured while fetching the volunteers");
    }
};

export const addVolunteer = async (body, token) => {
    try {
        const response = await fetch(URL + "/api/volunteer/add", {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        return {
            ok: response.ok,
            ...data,
        };
    } catch (error) {
        console.log("An error occured");
    }
};

export const updateVolunteer = async (body, token) => {
    try {
        const response = await fetch(URL + '/api/volunteer/update', {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return {
            ok: response.ok,
            ...data,
        };
    } catch (error) {
        console.log(error);
    }
};


export const deleteVolunteer = async (body, token) => {
    try {
        const response = await fetch(URL + '/api/volunteer/delete', {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return {
            ok: response.ok,
            ...data,
        };
    } catch (error) {
        console.log(error);
    }
}