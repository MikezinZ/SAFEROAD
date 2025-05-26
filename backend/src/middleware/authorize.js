const authorize = (allowedRoles) => {
    return (req, res, next) => {

        const userRole = req.user?.role;

        if (!userRole) {
            return res.status(403).json({ message: "Acesso negado. Nenhuma função de usuário encontrada no token." });
        }

        if (allowedRoles.includes(userRole)) {

            next();
        } else {

            return res.status(403).json({ message: "Acesso negado. Você não tem permissão para executar esta ação." });
        }
    };
};

module.exports = authorize;