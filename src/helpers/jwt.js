import jwt from 'jsonwebtoken';

const options = {
  issuer: process.env.JWT_ISSUER,
  audience: process.env.JWT_AUDIENCE
};

const secret = process.env.JWT_SECRET;

export function payloadToJWT (payload) {
  return jwt.sign(payload, secret, options);
}

export { options };
export { secret };
