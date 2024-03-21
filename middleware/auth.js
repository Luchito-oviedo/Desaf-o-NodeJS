// middleware.js

// Middleware para verificar si el usuario está autenticado
export const isAuthenticated = (req, res, next) => {
    // Verificar si el usuario está autenticado
    if (req.isAuthenticated()) {
        // Si el usuario está autenticado, continuar con la siguiente función de middleware
        return next();
    } else {
        // Si el usuario no está autenticado, redirigirlo a la página de inicio de sesión o enviar un error
        res.status(401).json({ message: 'No autorizado' });
    }
};

// Middleware para proteger ciertas rutas solo para usuarios administradores
export const isAdmin = (req, res, next) => {
    // Verificar si el usuario es administrador
    if (req.user && req.user.isAdmin) {
        // Si el usuario es administrador, continuar con la siguiente función de middleware
        return next();
    } else {
        // Si el usuario no es administrador, enviar un error de acceso prohibido
        res.status(403).json({ message: 'Acceso prohibido' });
    }
};

// Otros middlewares de seguridad pueden ser añadidos según tus necesidades
