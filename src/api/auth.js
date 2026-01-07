const URL = "https://adopt-a-need.onrender.com"

export const registerUser = async (user) => {
    try {
        const response = await fetch(URL + "/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        const data = await response.json();
        return {
            ok :response.ok,
            ...data,
        };
    } catch (error) {
        return "an error occured";
    }
};

export const loginUser = async (user) => {
    try {
        const response = await fetch(URL + "/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        const data = await response.json();
        return {
            ok: response.ok,
            ...data,
        };
    } catch (error) {
        return "an error occured";
    }
}

export const getUser = async (token) => {
    const response = await fetch(URL + "/api/auth/user", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });

    const data = await response.json();

    return {
        ok: response.ok,
        ...data,
    };
}

export const updateUser = async (info, token) => {
    const response = await fetch(URL + "/api/auth/updateuser", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(info),
    });

    const data = await response.json();
    return {
        ok: response.ok,
        ...data,
    };
};