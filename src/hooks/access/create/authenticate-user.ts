const authenticateUser = (prefillUser?:boolean) => {
    return ({req, data}) => {
    // User authentication
        if (!req.user) {
            return false
        }

        // Prefill user with authenticated user id when message is coming in from client
        if (req.user.collection !== "admin-users" && prefillUser) {
            data.user = req.user.id
        }
    
        return true
    }
}

export { authenticateUser }
export default authenticateUser 