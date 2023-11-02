# Blood Donor & Doctor Service App

- Live Link https://healtappfront.vercel.app/
- Front-end Repository Link:https://github.com/mamun2519/health_app_frontend

# SDLC (Software development Life Cycle)

## Client's Requirements

Create a website. A user can search for a blood donor from that website. After finding the user can message him. The doctor can see the patient through the website. There will be 5 roles, user, blood donor, doctor, manager, and admin.

**System Design**

- Monolithic Archtiecture

**Backend technology**

- Node Js, (using framework express js)

**Live Chat And Notification**

- Sockit.io

**Database**

- SQL (using Postgress And Prisma)

**Frontend technology**

- Next js

**UI Library**

- Taliwind Css

- Material UI

**Grap/ Chart**

- Chart.js

**Project Setup**

**Website Application**

System Design

⇒ Micro Service Archtiecture

Backend technology

⇒ Node Js, (using framework express js)

Live Chat And Notification

⇒ Sockit.io

Database

⇒ SQL (using Postgress Or Prisma)

**Frontend technology**

⇒ Next js

UI Library

⇒ Taliwind Css

⇒ Material UI

Grap/ Chart

⇒ Chart.js

**Mobile Application technology**

⇒ React Native

### **Model**

**Users**

- email
- password
- role
- status
- createAt
- updateAt

**Blood Donors**

- user_id (reference to user Model)
- donor_id
- avatar
- name
- phone
- blood_group
- present_address
  - district
  - sub_district
  - police_station (optional)
  - address
- home_address
  - district
  - sub_district
  - police_station (optional)
  - address
- gender
- date_of_birth
- total_blood_donnet
- last_donnet_date
- reward
- createAt
- updateAt

**Donor Reviews**

- donor_Id (donor id reference to donor Model)
- commented_user (user id Reference Id To User Model)
- comment
- createAt
- updateAt

**Donor Requests**

- donor_id (donor id reference to doner model)
- requested_user_id (user id Reference Id To User Model)
- status - enum Pending, Accepted, Completed
- location
- pratien_conditon
- phone
- blood_donoed_date
- total_blood
- createAt
- updateAt

**Block Lists**

- user_id (a reference to user-id in user model)
- block_account
  - account_id (reference to user model)

**Doctors**

- name
- user_id (reference to user Model)
- doctor_id
- avatar
- phone
- present_address
  - district
  - sub_district
  - police_station (optional)
  - address
- home_address
  - district
  - sub_district
  - police_station (optional)
  - address
- gender
- date_of_birth
- total_pritent
- balance
- createAt
- updateAt

**Medical Information**

- doctor_id (reference to doctor module)
- Medical_Education
- Main_specialization
- curtificated

**User profile**

- user_id (reference to user model)
- avater
- phone
- ## present_address
  - sub_district
  - police_station (optional)
  - address
- home_address
  - district
  - sub_district
  - police_station (optional)
  - address
- gender
- date_of_birth

**Doctor Services**

- doctor_id (a reference userId from the Doctor Model)
- title
- price
- avatar
- about_gig
- day [starday, Sunday, Monday….]
- service_day_no
- createAt
- updateAt

**Specialties Service Type**

- service_id (a reference to the doctor service model)
- service

**Service Salt**

- service_id (a reference to the doctor service model)
- salt
- start_time
- end_time

**service offer**

- service_id (a reference to the doctor service model)
- offer default No
- promo-code default no
- discount default no

**Services Reviews**

- service_id (reference from service model)
- patient_id (reference user ID from User Model)
- comment
- createAt
- updateAt

**Appointment**

- doctor_id (reference doctor model) (optional)
- service_id (reference to service model)
- patient_id (reference to userId to user Model)
- booking_date
- gender
- age
- weight
- Blood Group
- serial_no
- salt_time
- patient_problem
- report
- address
- status
- createAt
- updateAt

M**edicine prescription**

- patient_id (reference to user Model)
- appointment_id (reference to appointment model)
- date
- submit — pending
- submit_date

**medicine**

- prescription_id (a reference to the perception model)
- durg_name
- eating_time
- eat
- duration
- advice

**health Report**

- prescription_id (a reference to the perception model)
- test_name
- description

**Matting**

- service_id (reference to service model)
- status
- google_meet_link

**Payment**

- payment_user (reference user-id to user model)
- service_id (a reference to the service model)
- appointment_id (a reference to the appointment model)
- price
- transection_id
- discounted_price
- createAt
- updateAt

**Company Balance**

- balance
- doctor_id
- total_balance

**Notification**

- user (reference to User Model)
- message
- timestamp
- read_status
- createAt
- updateAt

**Message**

- sender (reference to user Model)
- receiver (reference to user model)
- message
- timestamp
- createAt
- updateAt

**Social Media**

**post**

- user_id (reference to user model)
- description
- avatar
- like default(0)
- createAt
- updateAt

**comment**

- post_id (reference to post model)
- user_id (user model)
- comment
- reply_Comment
- createAt
- updateAt

S**hare post**

- post_id (reference to post model)
- user_id (reference to user model)
- text
- liked default(0)

### **API END Points**

**Authentication**

- URL/auth/create-user (Post)
- URL/Auth/create-donor (post)
- URL/auth/create-doctor (post)
- URL/auth/forget-pass (post)
- URL/auth/reset-pass (post)
- URL/auth/refresh-token (Post)

**Profile**

- URL/profile/my-profile (Get)
- URL/profile/update (Patch)
- URL/profile/single/:id (Get)
- URL/profile/all (get)
- URL/profile/delete (Delete)

**User**

- URL/user/my-request/:id (Get)

**Blood Donor**

- URL/donor/search-donor (Get)
- URL/donor/details/:id (Get)
- URL/donor/request-donor(Post)
- URL/donor/my-request/:id (Get)
- URL/donor/delete-request (Delete)
- URL/donor/cancel-request (Post)
- URL/donor/Update-request (Patch)

**Donor Review**

- URL/donor-review/:id (Post)
- URL/donor-review/:id (Get)—-(Optional)
- URL/donor-review/update/:id (Patch)
- URL/donor-review/delete/:id (Delete)

**Doctor Service**

- URL/doctor-service/create (Post)
- URL/doctor-service/update/:id (Patch)
- URL/doctor-service/details/:id (Get)
- URL/doctor-service/my-service/:id (get)
- URL/Dcotor-service/all (Get)
- URL/doctor-service/:id (delete)

**Service Offer**

- URL/offer/create/:id (Post)
- URL/offer (Update)
- URL/offer (delete)

**Service Review**

- URL/service-review/:id (Post)
- URL/service-review/:id (Get)—-(Optional)
- URL/service-review/update/:id (Patch)
- URL/service-review/delete/:id (Delete)

**Appointment**

- URL/appointment (Post)
- URL/appointment/details/:id (get)
- URL/appointment/my-appointment/:id (Get)
- URL/appointment/booking-appointment/:id(get)
- URL/appointment/update/:id (Patch)
- URL/appointment/delete/:id (delete)

**Prescription**

- URL/**prescription** (Post)
- URL/prescription/details/:id (get)
- URL/prescription/my-prescription/:id (get) (Optional)
- URL/prescription (Update)
- URL/prescription (delete)

**Meeting**

- URL/meeting/:id (Post)
- URL/meeting/update/:id (Update)
- URL/meeting/delete/:id (delete)

**Meeting Request**

- URL/requested-meeting/:id (post)
- URL/meeting/update/:id (update)
- URL/meeting-request/:id (delete)

**Withdraw**

- URL/withdraw (Post)
- URL/withdraw (Get)
- URL/withdraw/my-withdraw/:id (get)
- URL/withdraw/details/:id (get)
- URL/withdraw/update/:id (Patch)
- URL/withdraw/accepted (Patch)
- URL/withdraw (delete)

**Admin**

- URL/admin/make-admin (Post)
- URL/admin/remove-user (Post)
- URL/admin/suspend-user (Post)

**Social Media**

- **Post**

- URL/post/create/:id (post)
- URL/Post/my-post/:id (Get)
- URL/post/all (Get)
- URL/post/update/:Id(Update)
- URL/post/:id (delete)
- URL/post/create-comment/:id (Post)
- URL/post/update-comment/:id (update)
- URL/post/delete-comment/:id (delete)
- URL/post/share-post (Post)
