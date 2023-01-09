import bcrypt from 'bcrypt';
import env from '../../config/app';

const createHash = (password: string): string => {
  const hash: string = bcrypt.hashSync(
    password + env.papper,
    parseInt(env.Salt as string)
  );
  return hash;
};

const checkPassword = (password: string, userPassword: string): boolean => {
  const check: boolean = bcrypt.compareSync(
    password + env.papper,
    userPassword
  );
  return check;
};

export default {
  createHash: createHash,
  checkPassword: checkPassword,
};
