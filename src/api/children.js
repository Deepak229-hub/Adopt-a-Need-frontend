export const getChildren = async (token) => {
    try {
        const response = await fetch('http://localhost:3000/api/children/', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error);
    }
};

export const createChild = async (body, token) => {
    try {
        const response = await fetch('http://localhost:3000/api/children/addChild', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};