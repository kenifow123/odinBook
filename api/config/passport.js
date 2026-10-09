const passport = require('passport');
const { prisma } = require('../lib/prisma.js');
const { Strategy : JwtStrategy, ExtractJwt } = require('passport-jwt');

passport.use(
    new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET_KEY,
    },
        async (payload, done) => {
            try {
                const user = await prisma.user.findUnique({
                    where: {
                        id : payload.user.id
                    }
                });
                
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            } catch (err) {
                return done(err, false);
            }
        })
)