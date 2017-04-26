// @flow
export default (ctx: any, ...args: string[]) => {
  const { body } = ctx.request;
  const badFields = args.reduce((badValidationFields: string[], field: string) => {
    if (body[field] === undefined) {
      badValidationFields.push(field);
    }
    return badValidationFields;
  }, []);
  if (badFields.length) {
    ctx.throw(402, `please check fields ${badFields.join(' ')}`);
  }
};
