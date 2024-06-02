import { fetchUsersFromServer } from "@/lib/api";
import MockLogin from "@/components/MockLogin";

export default async function Home() {
  const users = await fetchUsersFromServer();

  const students = users.filter((user) => user.role === "student");
  // console.log('students', students)
  const coaches = users.filter((user) => user.role === "coach");


  return (
    <MockLogin students={students} coaches={coaches} />
  );
}
