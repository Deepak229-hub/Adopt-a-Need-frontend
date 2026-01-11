export const getChildren = async (token) => {
    try {
        const response = await fetch('https://adopt-a-need.onrender.com/api/children', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        const data = await response.json();
        return {
            ok: response.ok,
            msg: data,
        };

    } catch (error) {
        console.log(error);
    }
};

export const createChild = async (body, token) => {
    try {
        const response = await fetch('https://adopt-a-need.onrender.com/api/children/addChild', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
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

export const updateChild = async (body, token) => {
    try {
        const response = await fetch('https://adopt-a-need.onrender.com/api/children/updatechild', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
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

export const deleteChild = async (body, token) => {
    try {
        const response = await fetch('https://adopt-a-need.onrender.com/api/children/removechild', {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}