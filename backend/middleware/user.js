const {z} = require("zod")
const signUpReqValidation =  z.object({
    name: z.string().min(3).max(100),
    email: z.string().min(5).max(100).email(),
    password: z.string().min(6).max(100)

}).superRefine(({password},checkPassComplexity)=>{
    const containsUppercase = (ch) => /[A-Z]/.test(ch);
    const containsLowercase = (ch) => /[a-z]/.test(ch);
    const containsSpecialChar = (ch) =>
      /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
    let countOfUpperCase = 0,
      countOfLowerCase = 0,
      countOfNumbers = 0,
      countOfSpecialChar = 0;
    for (let i = 0; i < password.length; i++) {
      let ch = password.charAt(i);
      if (!isNaN(+ch)) countOfNumbers++;
      else if (containsUppercase(ch)) countOfUpperCase++;
      else if (containsLowercase(ch)) countOfLowerCase++;
      else if (containsSpecialChar(ch)) countOfSpecialChar++;
    }
    if (
      countOfLowerCase < 1 ||
      countOfUpperCase < 1 ||
      countOfSpecialChar < 1 ||
      countOfNumbers < 1
    ) {
      checkPassComplexity.addIssue({
        code: "custom",
        message: "password does not meet complexity requirements",
      });
    }

})
const signUpValidation =(req,res,next)=>{
    const isValidData = signUpReqValidation.safeParse(req.body);;
    if(!isValidData.success){
        return res.json({error: isValidData.error})
    }
    next();
}

module.exports = {
    signUpValidation
}
