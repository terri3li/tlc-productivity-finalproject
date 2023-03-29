import Profile from "./Profile"

const UserRank = ({tasksCompleted}) => {

    let rank = ""

if (tasksCompleted <= 10) {
    rank = "Beginner"
} else if ((tasksCompleted > 10) && (tasksCompleted <= 25)) {
    rank = "1"
} else if ((tasksCompleted > 25) && (tasksCompleted <= 50)) {
    rank = "2"
} else if ((tasksCompleted > 50) && (tasksCompleted <= 75)) {
    rank = "3"
} else if ((tasksCompleted > 75) && (tasksCompleted <= 100)) {
    rank = "4"
} else if ((tasksCompleted > 100) && (tasksCompleted <= 150)) {
    rank = "5"
}

// pass rank as props to

  return <>
  <Profile rank={rank}/>
  </>;
};

export default UserRank;
