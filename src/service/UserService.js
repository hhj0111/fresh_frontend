export default class UserService {
    saveUser(user) {
        // user中包含：token,username
        sessionStorage.setItem("user", JSON.stringify(user))
    }
    loadUser() {
        let data = sessionStorage.getItem("user");
        if (data)
            return JSON.parse(data);
        return null;
    }
    removeUser(){
        sessionStorage.removeItem("user")
    };
}