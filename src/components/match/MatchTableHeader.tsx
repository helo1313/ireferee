import classes from "./matchTableHeader.module.scss";

const MatchTableHeader: React.FC = () => {
  return (
    <div className={classes.matchTableHeader}>
      <p>Date</p>
      <p>Role</p>
      <p>Teams</p>
      <p>Rating</p>
      <p>Status</p>
      <p>Actions</p>
    </div>
  );
};

export default MatchTableHeader;
