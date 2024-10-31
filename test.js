//async await
// => ใช้ตอนที่ต้องรอข้อมูล เช่น การต่อ api จาก server หรือ การเรียกใช้ข้อมูลใน database

//destructure object
const product = {
  name:"A",
  price:20
}

// const name = product.name
// const price = product.price

// const {name,price} = product //ใช้แบบล่างแทนได้

//HTTP 
/*
ส่วนประกอบ
1.url
2.headers ไว้ใช้ส่งพวก token ในการยืนยันตัวตน
3.request => input
3.1) request body => body form-data (ส่งไฟล์) , json (ข้อมูลทั่วไป)
3.2) request query ส่วนใหญ่ใช้กับ get ตัวอย่าง : www.example.com?x=123&y=456
3.3) request params ส่วนใหญ่ใช้กับ get ตัวอย่าง : www.example.com/123
4.response => output
5.method


็HTTP Method
- GET - READ
- POST - CREATE
- PUT - UPDATE
- DELETE - DELETE


Concept CRUD ของโปรแกรม => รูปแบบพื้นฐานของโปรแกรม
- CREATE => สร้างข้อมูล
- READ => ดึงข้อมูล
- UPDATE => แก้ไขข้อมูล
- DELETE => ลบข้อมูล

*/


/*
redux toolkit จัดการ state ใน react 

ตัวย่อยที่ช่วยจัดการ API เรียกว่า RTK Query

/*
  RTK Query
  มี 2 คำสั่ง => Query กับ Mutation
  Query=> ใช้กับ GET METHOD
  Mutation => ใช้กับ POST PUT DELETE

  ตัว RTK จะทำ hook มาให้ เช่น useXXXXQuery , useXXXXMutation เพื่อใช้งานต่อในหน้า page อื่น

  ตัวอย่างใช้งานหน้า page

  Query : 
  const { data, isLoading, refetch } = useFinanaceTransactionsQuery()
  - data => ข้อมูล
  - isLoading เป็น boolean true/false
  - refetch => function ในการ refresh ข้อมูล


  Mutation :
  const [withdraw, { isLoading }] = useWithdrawMutation()
  ข้อมูลจาก hook จะเป็น array
  1. index ตัวแรก คือ ชื่อ action เช่น withdraw 
  2. index ตัวสอง isLoading เป็น boolean true/false
*/


/*
  Realtime

  pain point
  1. application เรามี 2 ฝั่ง คือ influ กับ marketer
   ถ้าทางฝั่ง marketer มีการอัปเดตข้อมูล job จากหลังบ้าน 
   ฝั่ง influ เปิดหน้าเว็บอยู่ แต่ไม่รีเฟรขหน้า ข้อมูลจะไม่มีทางอัปเดตเลย
  


*/
