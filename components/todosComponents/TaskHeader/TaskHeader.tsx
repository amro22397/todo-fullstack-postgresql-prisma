import UserProfile from "./UserProfile";

import SearchButton from "./SearchButton";
import { TaskList } from "@/app/data/Tasks";
import { AppLogo } from "@/components/AppLogo";

const TaskHeader = ({ pagetaskList, email }: {pageTasksList?: TaskList, email: string | null | undefined}) => {

  // const session = await getSession();
  //   console.log(session?.user?.email)

  return (
    <div className="flex lg:flex-row flex-col justify-between items-center mb-0">
      <AppLogo />
      <div className="flex items-center ">
      <div className="flex flex-col gap-0 mr-3 md:hidden lg:flex">
          <span className="font-semibold">{pagetaskList?.name}</span>
        </div>
        <SearchButton />
        <UserProfile email={email} />
      </div>
    </div>
  )
}
  

export default TaskHeader
