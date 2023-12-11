/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '../../../prisma/prisma'
import {
  IDonorAndDoctorRequest,
  ILoginData,
  IRestPasswordRequest,
  IUserRequest,
  IUserResponse,
} from './auth.interface'
import nodemailer from 'nodemailer'
import Send_API_Error from '../../../error/apiError'
import { StatusCodes } from 'http-status-codes'
import { comparePassword, hashPasswordGenerator } from '../../../shared/bcrypt'
import { env_config } from '../../../config'
import { userNameGenerator } from '../../../shared/utils'
import { jwtHelper } from '../../../helper/jwtHelper'
import { Secret } from 'jsonwebtoken'
import { checkUser, checkUserName, getProfileById } from './auth.utils'
import { ForgetCode, Profile, User, UserRole, UserStatus } from '@prisma/client'

const createUserFromDB = async (data: IUserRequest): Promise<IUserResponse> => {
  const { name, avatar, cover, email, password, role } = data
  const isExistUser = await checkUser(email)
  if (isExistUser) {
    throw new Send_API_Error(StatusCodes.BAD_REQUEST, 'User already exist!')
  }
  // hashing user password
  const hashPassword = await hashPasswordGenerator(
    password,
    Number(env_config.saltRounds),
  )

  // generate unique Username
  let userName = userNameGenerator(name.first_name)

  // check already userName exist
  const isExistUserName = await checkUserName(userName)
  if (isExistUserName) {
    // again generate userName
    userName = userNameGenerator(name.last_name)
  }
  const result = await prisma.$transaction(async transactionClient => {
    let createUser
    if (role) {
      createUser = await transactionClient.user.create({
        data: {
          password: hashPassword,
          email,
          status: UserStatus.Active,
          role: UserRole.Admin,
        },
        include: { profile: true },
      })
    } else {
      createUser = await transactionClient.user.create({
        data: {
          password: hashPassword,
          email,
          status: UserStatus.Active,
        },
        include: { profile: true },
      })
    }

    await transactionClient.profile.create({
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
  })
  // generate token
  const accessToken = jwtHelper.tokenGenerate(
    { user_id: result.id, role: result.role },
    env_config.jwt.secret_token as Secret,
    env_config.jwt.expire_in as string,
  )
  // generate refresh token
  const refreshToken = jwtHelper.tokenGenerate(
    { user_id: result.id, role: result.role },
    env_config.jwt.refresh_token as Secret,
    env_config.jwt.refresh_expire_in as string,
  )
  // console.log(accessToken)
  return {
    user: { ...result },
    token: {
      accessToken,
      refreshToken,
    },
  }
}

const createBloodDonorFromDB = async (
  data: IDonorAndDoctorRequest,
): Promise<IUserResponse> => {
  const {
    name,
    email,
    password,
    // permanent_Address,
    present_Address,
    ...profileData
  } = data
  console.log(data)
  const isExistDonor = await checkUser(email)

  if (isExistDonor) {
    throw new Send_API_Error(StatusCodes.BAD_REQUEST, 'User Already exist!')
  }
  const hashPassword = await hashPasswordGenerator(
    password,
    Number(env_config.saltRounds),
  )
  let userName = userNameGenerator(name.first_name)
  const isExistUserName = await checkUserName(userName)
  if (isExistUserName) {
    userName = userNameGenerator(name.last_name)
  }
  const result = await prisma.$transaction(async transactionClient => {
    const createDonor = await transactionClient.user.create({
      data: {
        status: UserStatus.Active,
        role: UserRole.BloodDonor,
        email,
        password: hashPassword,
      },
    })
    const donorProfile = await transactionClient.profile.create({
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
    await transactionClient.bloodDonor.create({
      data: {
        user_id: createDonor.id,
      },
    })
    await transactionClient.presentAddress.create({
      data: {
        profile_Id: donorProfile.id,
        ...present_Address,
      },
    })
    // await transactionClient.permanentAddress.create({
    //   data: {
    //     profile_Id: donorProfile.id,
    //     ...permanent_Address,
    //   },
    // })
    return createDonor
  })

  const accessToken = jwtHelper.tokenGenerate(
    { user_id: result.id, role: result.role },
    env_config.jwt.secret_token as Secret,
    env_config.jwt.expire_in as string,
  )
  const refreshToken = jwtHelper.tokenGenerate(
    { user_id: result.id, role: result.role },
    env_config.jwt.refresh_token as Secret,
    env_config.jwt.refresh_expire_in as string,
  )

  return {
    user: result,
    token: {
      accessToken,
      refreshToken,
    },
  }
}

const createDoctorFromDB = async (
  data: IDonorAndDoctorRequest,
): Promise<IUserResponse> => {
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
    ...profileData
  } = data
  console.log(data)
  const isExistDoctor = await checkUser(email)
  console.log('email', email)
  console.log(isExistDoctor)
  if (isExistDoctor) {
    throw new Send_API_Error(StatusCodes.BAD_REQUEST, 'User Already exist!')
  }
  const hashPassword = await hashPasswordGenerator(
    password,
    Number(env_config.saltRounds),
  )
  let userName = userNameGenerator(name.first_name)
  const isUserNameExist = await checkUserName(userName)
  if (isUserNameExist) {
    userName = userNameGenerator(name.last_name)
  }
  const result = await prisma.$transaction(async transactionClient => {
    const createDoctor = await transactionClient.user.create({
      data: {
        status: UserStatus.Active,
        role: UserRole.Doctor,
        email,
        password: hashPassword,
      },
    })

    const doctorProfile = await transactionClient.profile.create({
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
    await transactionClient.doctor.create({
      data: {
        user_id: createDoctor.id,
        specialist: specialist as string,
        experience: experience as string,
        degree: degree as string,
      },
    })
    await transactionClient.presentAddress.create({
      data: {
        profile_Id: doctorProfile.id,
        ...present_Address,
      },
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
  })
  const accessToken = jwtHelper.tokenGenerate(
    { user_id: result.id, role: result.role },
    env_config.jwt.secret_token as Secret,
    env_config.jwt.expire_in as string,
  )
  const refreshToken = jwtHelper.tokenGenerate(
    { user_id: result.id, role: result.role },
    env_config.jwt.refresh_token as Secret,
    env_config.jwt.refresh_expire_in as string,
  )

  return {
    user: result,
    token: {
      accessToken,
      refreshToken,
    },
  }
}

const userLoginIntoDB = async (
  data: ILoginData,
): Promise<IUserResponse | null> => {
  console.log(data)
  let user
  if (data.email) {
    user = await checkUser(data.email as string)
    if (!user) {
      throw new Send_API_Error(StatusCodes.NOT_FOUND, 'User Not Found')
    }
  } else if (data.user_name) {
    const isExistName = await checkUserName(data.user_name as string)
    if (!isExistName) {
      throw new Send_API_Error(StatusCodes.NOT_FOUND, 'User Not Found')
    }
    user = await prisma.user.findFirst({
      where: {
        id: isExistName.user_id,
      },
    })
  }

  const matchPassword = await comparePassword(
    data.password,
    user?.password as string,
  )
  if (!matchPassword) {
    throw new Send_API_Error(StatusCodes.BAD_REQUEST, 'In Correct Password')
  }
  const accessToken = jwtHelper.tokenGenerate(
    { user_id: user?.id, role: user?.role },
    env_config.jwt.secret_token as Secret,
    env_config.jwt.expire_in as string,
  )
  return {
    user: user as User,
    token: {
      accessToken,
    },
  }
}

const forgetPasswordIntoDB = async (
  data: Partial<User>,
): Promise<User | null> => {
  const isExistUser = await checkUser(data?.email as string)
  if (!isExistUser) {
    throw new Send_API_Error(
      StatusCodes.NOT_FOUND,
      'Please Provide valid email',
    )
  }
  const hashPassword = await hashPasswordGenerator(
    data?.password as string,
    Number(env_config.saltRounds),
  )

  const updateUser = await prisma.user.update({
    where: {
      id: isExistUser.id,
    },
    data: {
      password: hashPassword,
    },
  })
  return updateUser
}
const resetPasswordIntoDB = async (
  data: IRestPasswordRequest,
): Promise<User | null> => {
  const isExistUser = await checkUser(data?.email as string)
  if (!isExistUser) {
    throw new Send_API_Error(
      StatusCodes.NOT_FOUND,
      'Please Provide valid email',
    )
  }
  const matchPassword = await comparePassword(
    data?.oldPassword as string,
    isExistUser.password,
  )
  if (!matchPassword) {
    throw new Send_API_Error(StatusCodes.BAD_REQUEST, 'In Correct Password')
  }
  const hashPassword = await hashPasswordGenerator(
    data?.newPassword as string,
    Number(env_config.saltRounds),
  )

  const updateUser = await prisma.user.update({
    where: {
      id: isExistUser.id,
    },
    data: {
      password: hashPassword,
    },
  })
  return updateUser
}
const changeUserNameIntoDB = async (
  id: string,
  data: Partial<Profile>,
): Promise<Profile | null> => {
  const isExistUser = await getProfileById(id)
  if (!isExistUser) {
    throw new Send_API_Error(StatusCodes.NOT_FOUND, 'User not found!')
  }
  const checkAlreadyName = await prisma.profile.findFirst({
    where: {
      user_name: data.user_name,
    },
  })
  if (checkAlreadyName) {
    throw new Send_API_Error(
      StatusCodes.BAD_REQUEST,
      'Username already available!',
    )
  }
  const result = await prisma.profile.update({
    where: {
      user_id: id,
    },
    data: {
      user_name: data.user_name,
    },
  })
  return result
}

const requestForgetPassword = async (data: {
  email: string
}): Promise<{ sendMessage: string; stepNo: number }> => {
  console.log(data.email)
  const isExistUser = await checkUser(data?.email as string)
  if (!isExistUser) {
    throw new Send_API_Error(
      StatusCodes.NOT_FOUND,
      'Please Provide valid email',
    )
  }

  const userProfile = await prisma.profile.findFirst({
    where: {
      user_id: isExistUser.id,
    },
  })

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: env_config.gmailHost,
    port: 3000,
    secure: false,
    requireTLS: true,
    auth: {
      user: env_config.myEmail,
      pass: env_config.emailPassword,
    },
  })
  // console.log(data.email)

  const resetCode = Math.floor(1000 + Math.random() * 9000).toString()

  await prisma.forgetCode.create({
    data: {
      email: data.email,
      code: Number(resetCode),
    },
  })
  const mailOptions = {
    from: env_config.myEmail,
    to: data.email,
    subject: 'Password Reset Code',
    // text: `Your password reset code is: ${resetCode}`,
    html:
      '<div> <h3 >Hi  ' +
      userProfile?.first_name +
      userProfile?.last_name +
      `,
     
      </h3>
      <p>Please use The code to reset the password for the health care app. </p>
      <p>Here is Your Code<h1>${resetCode}</h1></p>
      <p> Thank You</p>
      <p>Health Care Team </p>
      </div>`,
  }
  console.log(mailOptions)
  transporter.sendMail(mailOptions, function (error: any) {
    if (error) {
      throw new Send_API_Error(StatusCodes.BAD_REQUEST, 'Error sending email')
    }
  })
  return {
    sendMessage: 'Email Send',
    stepNo: 2,
  }
}

const CheckValidationResetCode = async (
  data: ForgetCode,
): Promise<{ sendMessage: string; stepNo: number }> => {
  const isExistCode = await prisma.forgetCode.findFirst({
    where: {
      email: data.email,
      code: data.code,
    },
  })
  if (!isExistCode) {
    throw new Send_API_Error(StatusCodes.NOT_FOUND, 'Invalid Code')
  }
  return {
    sendMessage: 'Code is Matched',
    stepNo: 3,
  }
}
const forgetPasswordWithCode = async (
  userCredential: Partial<User>,
): Promise<{ sendMessage: string; stepNo: number }> => {
  await forgetPasswordIntoDB(userCredential)
  await prisma.forgetCode.deleteMany({ where: { email: userCredential.email } })
  return {
    sendMessage: 'Password Change Successfully',
    stepNo: 4,
  }
}

export const AuthService = {
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
