const TreatYourself = ({ randomRewards }) => {
  const yourRandomReward =
    randomRewards.rewards[Math.floor(Math.random() * 15)];

  return (
    <>
      <h1>Treat Yourself</h1>
      <h3>Trade in those productive points for a well earned treat!</h3>
      <h4>Use your own custom rewards or let us pick one for you</h4>
      <button>Reward Time (cost: 250pts)</button>
      <p>Your random reward: {yourRandomReward}</p>
    </>
  );
};

export default TreatYourself;
