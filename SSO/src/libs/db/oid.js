import crypto from 'crypto';

// oid('course1') => generates always same id
export default str => crypto.createHash('md5').update(str).digest('hex').substring(0, 24);
