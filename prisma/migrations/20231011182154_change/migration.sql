-- CreateEnum
CREATE TYPE "DonorRequestStatus" AS ENUM ('Pending', 'Accepted', 'Complete', 'Cancel');

-- CreateEnum
CREATE TYPE "PrescriptionEnumStatus" AS ENUM ('Pending', 'Assing', 'Complete');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('User', 'BloodDonor', 'Doctor', 'Manager');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('Active', 'Pending', 'Suspend', 'Disabled');

-- CreateEnum
CREATE TYPE "UserVerification" AS ENUM ('true', 'false', 'Pending');

-- CreateEnum
CREATE TYPE "WithdrawEnumStatus" AS ENUM ('Pending', 'Cancel', 'Complete');

-- CreateEnum
CREATE TYPE "appointmentStatus" AS ENUM ('Pending', 'Accepted', 'Complete', 'Expired', 'TestSebmit');

-- CreateEnum
CREATE TYPE "doctorServiceOfferStatus" AS ENUM ('Active', 'Expired');

-- CreateEnum
CREATE TYPE "enumPaymentRecive" AS ENUM ('Bank', 'Nogod', 'Bikash', 'MasterCard', 'Paypal');

-- CreateEnum
CREATE TYPE "meetingEnumStatus" AS ENUM ('Active', 'Complete', 'Expired');

-- CreateEnum
CREATE TYPE "userGender" AS ENUM ('Male', 'Female', 'Other');

-- CreateTable
CREATE TABLE "Test" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appoinment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "doctorId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bookingDate" TEXT NOT NULL,
    "gender" "userGender" NOT NULL,
    "age" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "bloodGroup" TEXT NOT NULL,
    "serialNo" INTEGER NOT NULL,
    "slatTime" TEXT NOT NULL,
    "patientProblem" TEXT NOT NULL,
    "report" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "status" "appointmentStatus" NOT NULL DEFAULT 'Pending',
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "appoinment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blood-donors" (
    "id" TEXT NOT NULL,
    "total_donnet" INTEGER NOT NULL DEFAULT 0,
    "last_donnet_date" TEXT,
    "reward" INTEGER NOT NULL DEFAULT 0,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "totalPendingRequest" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "blood-donors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_balance" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "balance" INTEGER NOT NULL,

    CONSTRAINT "company_balance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctor_service" (
    "id" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "aboutSerivce" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "serviceDay" TEXT[],
    "category" TEXT NOT NULL,

    CONSTRAINT "doctor_service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctor_service_offer" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT,
    "offerTitle" TEXT NOT NULL,
    "promoCode" TEXT NOT NULL,
    "discount" INTEGER NOT NULL,
    "expireDate" TEXT NOT NULL,
    "status" "doctorServiceOfferStatus" NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "doctorId" TEXT NOT NULL,

    CONSTRAINT "doctor_service_offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctor_service_review" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT,
    "userId" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "doctor_service_review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctor_service_salt" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "duration" TEXT NOT NULL,
    "salt" TEXT[],

    CONSTRAINT "doctor_service_salt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctors" (
    "id" TEXT NOT NULL,
    "total_patient" INTEGER NOT NULL DEFAULT 0,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "experience" TEXT NOT NULL,
    "specialist" TEXT NOT NULL,
    "degree" TEXT NOT NULL DEFAULT 'Doctor of Medicine (M.D.)',

    CONSTRAINT "doctors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donor_request" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "donorId" TEXT NOT NULL,
    "status" "DonorRequestStatus" NOT NULL DEFAULT 'Pending',
    "location" TEXT NOT NULL,
    "pratienCondition" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "donnetDate" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "donor_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donor_review" (
    "id" TEXT NOT NULL,
    "donorId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "donor_review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "education" (
    "id" TEXT NOT NULL,
    "institute" TEXT NOT NULL,
    "pass_year" TEXT NOT NULL,
    "GPA" TEXT NOT NULL,
    "completionYear" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,

    CONSTRAINT "education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "google-meet" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "serviceId" TEXT NOT NULL,
    "meetLink" TEXT NOT NULL,
    "status" "meetingEnumStatus" NOT NULL DEFAULT 'Active',
    "doctorId" TEXT NOT NULL,

    CONSTRAINT "google-meet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "healtReport" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "prescriptionId" TEXT NOT NULL,
    "testName" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "healtReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medicine" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "prescriptionId" TEXT NOT NULL,
    "durgName" TEXT NOT NULL,
    "eatingTime" TEXT[],
    "duration" TEXT NOT NULL,
    "advice" TEXT NOT NULL,
    "eat" TEXT NOT NULL,

    CONSTRAINT "medicine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meeting_request" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "meetingId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "appointmentId" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "serialNo" INTEGER NOT NULL,
    "verifay" BOOLEAN NOT NULL,
    "doctorId" TEXT NOT NULL,

    CONSTRAINT "meeting_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "readStatus" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "paymentType" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Complete',
    "price" INTEGER NOT NULL,
    "discountedPrice" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permanent-address" (
    "id" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "sub_district" TEXT NOT NULL,
    "police_station" TEXT,
    "address" TEXT NOT NULL,
    "profile_Id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "permanent-address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prescriptions" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "appointmentId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "submitDate" TEXT NOT NULL,
    "advice" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "status" "PrescriptionEnumStatus" NOT NULL DEFAULT 'Pending',

    CONSTRAINT "prescriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "present-address" (
    "id" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "sub_district" TEXT NOT NULL,
    "police_station" TEXT,
    "address" TEXT NOT NULL,
    "profile_Id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "present-address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user-profiles" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "gender" TEXT,
    "date_of_birth" TEXT,
    "blood_group" TEXT,
    "phone" TEXT,
    "avatar" TEXT NOT NULL,
    "cover" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,

    CONSTRAINT "user-profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'User',
    "status" "UserStatus" NOT NULL DEFAULT 'Active',
    "verified" "UserVerification" NOT NULL DEFAULT 'false',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "withdraw" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "doctorId" TEXT NOT NULL,
    "paymentReciveType" "enumPaymentRecive" NOT NULL,
    "number" TEXT NOT NULL,
    "bankName" TEXT,
    "status" "WithdrawEnumStatus" NOT NULL DEFAULT 'Pending',
    "withdrawAccptetManagerId" TEXT,
    "amount" INTEGER NOT NULL,
    "finalAmonut" INTEGER NOT NULL,
    "companyEarn" INTEGER NOT NULL,

    CONSTRAINT "withdraw_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "blood-donors_user_id_key" ON "blood-donors"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "doctor_service_offer_serviceId_key" ON "doctor_service_offer"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "doctor_service_salt_serviceId_key" ON "doctor_service_salt"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "doctors_user_id_key" ON "doctors"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "permanent-address_profile_Id_key" ON "permanent-address"("profile_Id");

-- CreateIndex
CREATE UNIQUE INDEX "present-address_profile_Id_key" ON "present-address"("profile_Id");

-- CreateIndex
CREATE UNIQUE INDEX "user-profiles_user_id_key" ON "user-profiles"("user_id");

-- AddForeignKey
ALTER TABLE "appoinment" ADD CONSTRAINT "appoinment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appoinment" ADD CONSTRAINT "appoinment_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "doctor_service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appoinment" ADD CONSTRAINT "appoinment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blood-donors" ADD CONSTRAINT "blood-donors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_service" ADD CONSTRAINT "doctor_service_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_service_offer" ADD CONSTRAINT "doctor_service_offer_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_service_offer" ADD CONSTRAINT "doctor_service_offer_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "doctor_service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_service_review" ADD CONSTRAINT "doctor_service_review_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "doctor_service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_service_review" ADD CONSTRAINT "doctor_service_review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_service_salt" ADD CONSTRAINT "doctor_service_salt_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "doctor_service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donor_request" ADD CONSTRAINT "donor_request_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "blood-donors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donor_request" ADD CONSTRAINT "donor_request_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donor_review" ADD CONSTRAINT "donor_review_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "blood-donors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donor_review" ADD CONSTRAINT "donor_review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "education" ADD CONSTRAINT "education_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "user-profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "google-meet" ADD CONSTRAINT "google-meet_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "google-meet" ADD CONSTRAINT "google-meet_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "doctor_service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "healtReport" ADD CONSTRAINT "healtReport_prescriptionId_fkey" FOREIGN KEY ("prescriptionId") REFERENCES "prescriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicine" ADD CONSTRAINT "medicine_prescriptionId_fkey" FOREIGN KEY ("prescriptionId") REFERENCES "prescriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meeting_request" ADD CONSTRAINT "meeting_request_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "appoinment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meeting_request" ADD CONSTRAINT "meeting_request_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meeting_request" ADD CONSTRAINT "meeting_request_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "google-meet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meeting_request" ADD CONSTRAINT "meeting_request_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "doctor_service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permanent-address" ADD CONSTRAINT "permanent-address_profile_Id_fkey" FOREIGN KEY ("profile_Id") REFERENCES "user-profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prescriptions" ADD CONSTRAINT "prescriptions_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "appoinment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prescriptions" ADD CONSTRAINT "prescriptions_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prescriptions" ADD CONSTRAINT "prescriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "present-address" ADD CONSTRAINT "present-address_profile_Id_fkey" FOREIGN KEY ("profile_Id") REFERENCES "user-profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user-profiles" ADD CONSTRAINT "user-profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "withdraw" ADD CONSTRAINT "withdraw_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "withdraw" ADD CONSTRAINT "withdraw_withdrawAccptetManagerId_fkey" FOREIGN KEY ("withdrawAccptetManagerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
