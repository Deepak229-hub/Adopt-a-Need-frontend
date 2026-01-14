const URL = "http://localhost:3000/api/order";

export const createOrder = async (body) => {
    try {
        const response = await fetch(URL + "/create", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const validateOrder = async (body) => {
    try {
        const response = await fetch(URL + "/validate", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}