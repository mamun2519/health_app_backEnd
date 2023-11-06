/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import prisma from '../../../prisma/prisma'

export const FinalTop5Service = async () => {
  const sales = await prisma.payment.findMany({
    include: {
      service: {
        include: {
          doctor: {
            include: {
              user: {
                include: {
                  profile: true,
                },
              },
            },
          },
        },
      },
    },
  })
  const totalSales = sales.reduce((acc, obj) => acc + obj.price, 0)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uniqueObjects: any = {}

  sales.forEach(obj => {
    const key = obj.serviceId
    if (uniqueObjects[key]) {
      uniqueObjects[key].price += obj.price
    } else {
      uniqueObjects[key] = { ...obj }
    }
  })

  const uniqueArrayOfObjects = Object.values(uniqueObjects)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uniqueArrayOfObjects.sort((a: any, b: any) => b.price - a.price)

  // Get the top 5 unique objects with the highest prices
  const top5Prices = uniqueArrayOfObjects.slice(0, 5)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const finalTop5Service = top5Prices.map((service: any) => {
    return {
      doctorName: `${service.service.doctor.user.profile.first_name} ${service.service.doctor.user.profile.last_name}`,
      serviceName: service.service.title,
      price: service.price,
    }
  })

  return { finalTop5Service, totalSales }
}

export const FinalTop5Donar = async () => {
  const donorRequest = await prisma.donorRequest.findMany({
    where: {
      status: 'Completed',
    },
    include: {
      donor: {
        include: {
          user: {
            include: {
              profile: true,
            },
          },
        },
      },
    },
  })
  const uniqueDonorObjects: any = {}

  donorRequest.forEach(obj => {
    const key = obj?.donorId
    if (uniqueDonorObjects[key]) {
      uniqueDonorObjects[key].quantity += obj.quantity
    } else {
      uniqueDonorObjects[key] = { ...obj }
    }
  })

  const uniqueDonor = Object.values(uniqueDonorObjects)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uniqueDonor.sort((a: any, b: any) => b.price - a.price)

  // Get the top 5 unique objects with the highest prices
  const top5Donor = uniqueDonor.slice(0, 5)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const finalTop5Donor = top5Donor.map((donor: any) => {
    return {
      donorName: `${donor.donor.user.profile.first_name} ${donor.donor.user.profile.last_name}`,
      bloodGroup: donor.donor.user.profile.blood_group,
      totalBloodDonatedQuantity: donor.quantity,
    }
  })

  return finalTop5Donor
}

export const DoctorTop5ServicePrice = async (doctorId: string) => {
  const sales = await prisma.payment.findMany({
    where: {
      doctorId,
    },
    include: {
      service: {
        include: {
          doctor: {
            include: {
              user: {
                include: {
                  profile: true,
                },
              },
            },
          },
        },
      },
    },
  })
  const totalSales = sales.reduce((acc, obj) => acc + obj.price, 0)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uniqueObjects: any = {}

  sales.forEach(obj => {
    const key = obj.serviceId
    if (uniqueObjects[key]) {
      uniqueObjects[key].price += obj.price
    } else {
      uniqueObjects[key] = { ...obj }
    }
  })

  const uniqueArrayOfObjects = Object.values(uniqueObjects)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uniqueArrayOfObjects.sort((a: any, b: any) => b.price - a.price)

  // Get the top 5 unique objects with the highest prices
  const top5Prices = uniqueArrayOfObjects.slice(0, 5)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const finalTopPriceService = top5Prices.map((service: any) => {
    return {
      serviceName: service.service.title,
      price: service.price,
      category: service.service.category,
    }
  })

  return { finalTopPriceService, totalSales }
}

export const DoctorResentWithdraw = async (doctorId: string) => {
  const withdraw = await prisma.withdraw.findMany({
    take: 5,

    where: {
      status: 'Complete',
      doctorId: doctorId,
    },
    include: {
      doctor: {
        include: {
          user: {
            include: {
              profile: true,
            },
          },
        },
      },
    },
    orderBy: {
      amount: 'desc',
    },
  })

  const Top5Withdraw = withdraw
    .map(withdraw => {
      return {
        amount: withdraw.amount,
        companyEarn: withdraw.companyEarn,
        date: withdraw.createdAt,
      }
    })
    .slice(0, 5)

  return Top5Withdraw
}

export const MyCompleteBloodDonation = async (donorId: string) => {
  const donor = await prisma.donorRequest.findMany({
    where: {
      status: 'Completed',
      donorId,
    },
    include: {
      user: {
        include: {
          profile: true,
        },
      },
    },
  })

  const finalDonation = donor
    .map(donation => {
      return {
        requestUserName: `${donation.user.profile?.first_name} ${donation.user.profile?.last_name}`,
        // date: donation.c
        total: donation.quantity,
        location: donation.location,
      }
    })
    .slice(0, 8)

  return finalDonation
}

export const MyDonarRequest = async (userId: string) => {
  const donor = await prisma.donorRequest.findMany({
    where: {
      userId,
    },
    include: {
      donor: {
        include: {
          user: {
            include: {
              profile: true,
            },
          },
        },
      },
    },
  })

  const finalDonation = donor
    .map(donation => {
      return {
        donarName: `${donation.donor.user.profile?.first_name} ${donation.donor.user.profile?.last_name}`,
        // date: donation.c
        total: donation.quantity,
        status: donation.status,
      }
    })
    .slice(0, 8)

  return finalDonation
}
