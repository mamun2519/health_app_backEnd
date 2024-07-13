'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {}
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p]
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]]
      }
    return t
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.AuthService = void 0
/* eslint-disable @typescript-eslint/no-explicit-any */
const prisma_1 = __importDefault(require('../../../prisma/prisma'))
const nodemailer_1 = __importDefault(require('nodemailer'))
const apiError_1 = __importDefault(require('../../../error/apiError'))
const http_status_codes_1 = require('http-status-codes')
const bcrypt_1 = require('../../../shared/bcrypt')
const config_1 = require('../../../config')
const utils_1 = require('../../../shared/utils')
const jwtHelper_1 = require('../../../helper/jwtHelper')
const auth_utils_1 = require('./auth.utils')
const client_1 = require('@prisma/client')
const createUserFromDB = data =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { name, avatar, cover, email, password, role } = data
    const isExistUser = yield (0, auth_utils_1.checkUser)(email)
    if (isExistUser) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        'User already exist!',
      )
    }
    // hashing user password
    const hashPassword = yield (0, bcrypt_1.hashPasswordGenerator)(
      password,
      Number(config_1.env_config.saltRounds),
    )
    // generate unique Username
    let userName = (0, utils_1.userNameGenerator)(name.first_name)
    // check already userName exist
    const isExistUserName = yield (0, auth_utils_1.checkUserName)(userName)
    if (isExistUserName) {
      // again generate userName
      userName = (0, utils_1.userNameGenerator)(name.last_name)
    }
    const result = yield prisma_1.default.$transaction(transactionClient =>
      __awaiter(void 0, void 0, void 0, function* () {
        let createUser
        if (role) {
          createUser = yield transactionClient.user.create({
            data: {
              password: hashPassword,
              email,
              status: client_1.UserStatus.Active,
              role: client_1.UserRole.Admin,
            },
            include: { profile: true },
          })
        } else {
          createUser = yield transactionClient.user.create({
            data: {
              password: hashPassword,
              email,
              status: client_1.UserStatus.Active,
            },
            include: { profile: true },
          })
        }
        yield transactionClient.profile.create({
          data: {
            avatar,
            cover,
            user_name: userName,
            first_name: name.first_name,
            last_name: name.last_name,
            user_id: createUser.id,
          },
          include: { user: true },
        })
        return createUser
      }),
    )
    // generate token
    const accessToken = jwtHelper_1.jwtHelper.tokenGenerate(
      { user_id: result.id, role: result.role },
      config_1.env_config.jwt.secret_token,
      config_1.env_config.jwt.expire_in,
    )
    // generate refresh token
    const refreshToken = jwtHelper_1.jwtHelper.tokenGenerate(
      { user_id: result.id, role: result.role },
      config_1.env_config.jwt.refresh_token,
      config_1.env_config.jwt.refresh_expire_in,
    )
    // console.log(accessToken)
    return {
      user: Object.assign({}, result),
      token: {
        accessToken,
        refreshToken,
      },
    }
  })
const createBloodDonorFromDB = data =>
  __awaiter(void 0, void 0, void 0, function* () {
    const {
        name,
        email,
        password,
        // permanent_Address,
        present_Address,
      } = data,
      profileData = __rest(data, [
        'name',
        'email',
        'password',
        'present_Address',
      ])
    const isExistDonor = yield (0, auth_utils_1.checkUser)(email)
    if (isExistDonor) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        'User Already exist!',
      )
    }
    const hashPassword = yield (0, bcrypt_1.hashPasswordGenerator)(
      password,
      Number(config_1.env_config.saltRounds),
    )
    let userName = (0, utils_1.userNameGenerator)(name.first_name)
    const isExistUserName = yield (0, auth_utils_1.checkUserName)(userName)
    if (isExistUserName) {
      userName = (0, utils_1.userNameGenerator)(name.last_name)
    }
    const result = yield prisma_1.default.$transaction(transactionClient =>
      __awaiter(void 0, void 0, void 0, function* () {
        const createDonor = yield transactionClient.user.create({
          data: {
            status: client_1.UserStatus.Active,
            role: client_1.UserRole.BloodDonor,
            email,
            password: hashPassword,
          },
        })
        const donorProfile = yield transactionClient.profile.create({
          data: {
            avatar: profileData.avatar,
            user_name: userName,
            first_name: name.first_name,
            last_name: name.last_name,
            user_id: createDonor.id,
            gender: profileData.gender,
            date_of_birth: profileData.date_of_birth,
            blood_group: profileData.blood_group,
            phone: profileData.phone,
          },
        })
        yield transactionClient.bloodDonor.create({
          data: {
            user_id: createDonor.id,
          },
        })
        yield transactionClient.presentAddress.create({
          data: Object.assign({ profile_Id: donorProfile.id }, present_Address),
        })
        // await transactionClient.permanentAddress.create({
        //   data: {
        //     profile_Id: donorProfile.id,
        //     ...permanent_Address,
        //   },
        // })
        return createDonor
      }),
    )
    const accessToken = jwtHelper_1.jwtHelper.tokenGenerate(
      { user_id: result.id, role: result.role },
      config_1.env_config.jwt.secret_token,
      config_1.env_config.jwt.expire_in,
    )
    const refreshToken = jwtHelper_1.jwtHelper.tokenGenerate(
      { user_id: result.id, role: result.role },
      config_1.env_config.jwt.refresh_token,
      config_1.env_config.jwt.refresh_expire_in,
    )
    return {
      user: result,
      token: {
        accessToken,
        refreshToken,
      },
    }
  })
const createDoctorFromDB = data =>
  __awaiter(void 0, void 0, void 0, function* () {
    const {
        name,
        email,
        password,
        // permanent_Address,
        present_Address,
        // education,
        specialist,
        degree,
        experience,
      } = data,
      profileData = __rest(data, [
        'name',
        'email',
        'password',
        'present_Address',
        'specialist',
        'degree',
        'experience',
      ])
    const isExistDoctor = yield (0, auth_utils_1.checkUser)(email)
    if (isExistDoctor) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        'User Already exist!',
      )
    }
    const hashPassword = yield (0, bcrypt_1.hashPasswordGenerator)(
      password,
      Number(config_1.env_config.saltRounds),
    )
    let userName = (0, utils_1.userNameGenerator)(name.first_name)
    const isUserNameExist = yield (0, auth_utils_1.checkUserName)(userName)
    if (isUserNameExist) {
      userName = (0, utils_1.userNameGenerator)(name.last_name)
    }
    const result = yield prisma_1.default.$transaction(transactionClient =>
      __awaiter(void 0, void 0, void 0, function* () {
        const createDoctor = yield transactionClient.user.create({
          data: {
            status: client_1.UserStatus.Active,
            role: client_1.UserRole.Doctor,
            email,
            password: hashPassword,
          },
        })
        const doctorProfile = yield transactionClient.profile.create({
          data: {
            avatar: profileData.avatar,
            user_name: userName,
            first_name: name.first_name,
            last_name: name.last_name,
            user_id: createDoctor.id,
            gender: profileData.gender,
            date_of_birth: profileData.date_of_birth,
            blood_group: profileData.blood_group,
            phone: profileData.phone,
          },
        })
        yield transactionClient.doctor.create({
          data: {
            user_id: createDoctor.id,
            specialist: specialist,
            experience: experience,
            degree: degree,
          },
        })
        yield transactionClient.presentAddress.create({
          data: Object.assign(
            { profile_Id: doctorProfile.id },
            present_Address,
          ),
        })
        // await transactionClient.permanentAddress.create({
        //   data: {
        //     profile_Id: doctorProfile.id,
        //     ...permanent_Address,
        //   },
        // })
        // if (education) {
        //   for (let i = 0; i < education?.length; i++) {
        //     await transactionClient.education.create({
        //       data: {
        //         profile_id: doctorProfile.id,
        //         institute: education[i].institute as string,
        //         GPA: education[i].GPA as string,
        //         completionYear: education[i].completionYear as string,
        //         pass_year: education[i].pass_year as string,
        //       },
        //     })
        //   }
        // }
        return createDoctor
      }),
    )
    const accessToken = jwtHelper_1.jwtHelper.tokenGenerate(
      { user_id: result.id, role: result.role },
      config_1.env_config.jwt.secret_token,
      config_1.env_config.jwt.expire_in,
    )
    const refreshToken = jwtHelper_1.jwtHelper.tokenGenerate(
      { user_id: result.id, role: result.role },
      config_1.env_config.jwt.refresh_token,
      config_1.env_config.jwt.refresh_expire_in,
    )
    return {
      user: result,
      token: {
        accessToken,
        refreshToken,
      },
    }
  })
const userLoginIntoDB = data =>
  __awaiter(void 0, void 0, void 0, function* () {
    let user
    if (data.email) {
      user = yield (0, auth_utils_1.checkUser)(data.email)
      if (!user) {
        throw new apiError_1.default(
          http_status_codes_1.StatusCodes.NOT_FOUND,
          'User Not Found',
        )
      }
    } else if (data.user_name) {
      const isExistName = yield (0, auth_utils_1.checkUserName)(data.user_name)
      if (!isExistName) {
        throw new apiError_1.default(
          http_status_codes_1.StatusCodes.NOT_FOUND,
          'User Not Found',
        )
      }
      user = yield prisma_1.default.user.findFirst({
        where: {
          id: isExistName.user_id,
        },
      })
    }
    const matchPassword = yield (0, bcrypt_1.comparePassword)(
      data.password,
      user === null || user === void 0 ? void 0 : user.password,
    )
    if (!matchPassword) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        'In Correct Password',
      )
    }
    const accessToken = jwtHelper_1.jwtHelper.tokenGenerate(
      {
        user_id: user === null || user === void 0 ? void 0 : user.id,
        role: user === null || user === void 0 ? void 0 : user.role,
      },
      config_1.env_config.jwt.secret_token,
      config_1.env_config.jwt.expire_in,
    )
    return {
      user: user,
      token: {
        accessToken,
      },
    }
  })
const forgetPasswordIntoDB = data =>
  __awaiter(void 0, void 0, void 0, function* () {
    const isExistUser = yield (0, auth_utils_1.checkUser)(
      data === null || data === void 0 ? void 0 : data.email,
    )
    if (!isExistUser) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'Please Provide valid email',
      )
    }
    const hashPassword = yield (0, bcrypt_1.hashPasswordGenerator)(
      data === null || data === void 0 ? void 0 : data.password,
      Number(config_1.env_config.saltRounds),
    )
    const updateUser = yield prisma_1.default.user.update({
      where: {
        id: isExistUser.id,
      },
      data: {
        password: hashPassword,
      },
    })
    return updateUser
  })
const resetPasswordIntoDB = data =>
  __awaiter(void 0, void 0, void 0, function* () {
    const isExistUser = yield (0, auth_utils_1.checkUser)(
      data === null || data === void 0 ? void 0 : data.email,
    )
    if (!isExistUser) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'Please Provide valid email',
      )
    }
    const matchPassword = yield (0, bcrypt_1.comparePassword)(
      data === null || data === void 0 ? void 0 : data.oldPassword,
      isExistUser.password,
    )
    if (!matchPassword) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        'In Correct Password',
      )
    }
    const hashPassword = yield (0, bcrypt_1.hashPasswordGenerator)(
      data === null || data === void 0 ? void 0 : data.newPassword,
      Number(config_1.env_config.saltRounds),
    )
    const updateUser = yield prisma_1.default.user.update({
      where: {
        id: isExistUser.id,
      },
      data: {
        password: hashPassword,
      },
    })
    return updateUser
  })
const changeUserNameIntoDB = (id, data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const isExistUser = yield (0, auth_utils_1.getProfileById)(id)
    if (!isExistUser) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'User not found!',
      )
    }
    const checkAlreadyName = yield prisma_1.default.profile.findFirst({
      where: {
        user_name: data.user_name,
      },
    })
    if (checkAlreadyName) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        'Username already available!',
      )
    }
    const result = yield prisma_1.default.profile.update({
      where: {
        user_id: id,
      },
      data: {
        user_name: data.user_name,
      },
    })
    return result
  })
const requestForgetPassword = data =>
  __awaiter(void 0, void 0, void 0, function* () {
    const isExistUser = yield (0, auth_utils_1.checkUser)(
      data === null || data === void 0 ? void 0 : data.email,
    )
    if (!isExistUser) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'Please Provide valid email',
      )
    }
    const userProfile = yield prisma_1.default.profile.findFirst({
      where: {
        user_id: isExistUser.id,
      },
    })
    const transporter = nodemailer_1.default.createTransport({
      service: 'gmail',
      host: config_1.env_config.gmailHost,
      // port: 25,
      port: 3000,
      secure: false,
      requireTLS: true,
      auth: {
        user: config_1.env_config.myEmail,
        pass: config_1.env_config.emailPassword,
      },
    })
    const resetCode = Math.floor(1000 + Math.random() * 9000).toString()
    yield prisma_1.default.forgetCode.create({
      data: {
        email: data.email,
        code: Number(resetCode),
      },
    })
    const mailOptions = {
      from: config_1.env_config.myEmail,
      to: data.email,
      subject: 'Password Reset Code',
      // text: `Your password reset code is: ${resetCode}`,
      html:
        '<div> <h3 >Hi  ' +
        (userProfile === null || userProfile === void 0
          ? void 0
          : userProfile.first_name) +
        (userProfile === null || userProfile === void 0
          ? void 0
          : userProfile.last_name) +
        `,
     
      </h3>
      <p>Please use The code to reset the password for the health care app. </p>
      <p>Here is Your Code<h1>${resetCode}</h1></p>
      <p> Thank You</p>
      <p>Health Care Team </p>
      </div>`,
    }
    transporter.sendMail(mailOptions, function (error) {
      if (error) {
        throw new apiError_1.default(
          http_status_codes_1.StatusCodes.BAD_REQUEST,
          'Error sending email',
        )
      }
    })
    return {
      sendMessage: 'Email Send',
      stepNo: 2,
    }
  })
const CheckValidationResetCode = data =>
  __awaiter(void 0, void 0, void 0, function* () {
    const isExistCode = yield prisma_1.default.forgetCode.findFirst({
      where: {
        email: data.email,
        code: data.code,
      },
    })
    if (!isExistCode) {
      throw new apiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'Invalid Code',
      )
    }
    return {
      sendMessage: 'Code is Matched',
      stepNo: 3,
    }
  })
const forgetPasswordWithCode = userCredential =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield forgetPasswordIntoDB(userCredential)
    yield prisma_1.default.forgetCode.deleteMany({
      where: { email: userCredential.email },
    })
    return {
      sendMessage: 'Password Change Successfully',
      stepNo: 4,
    }
  })
exports.AuthService = {
  createUserFromDB,
  createBloodDonorFromDB,
  createDoctorFromDB,
  userLoginIntoDB,
  forgetPasswordIntoDB,
  resetPasswordIntoDB,
  changeUserNameIntoDB,
  requestForgetPassword,
  CheckValidationResetCode,
  forgetPasswordWithCode,
}
