import { ListGroupItem, Badge } from "react-bootstrap";
import "./Common.css";

export const User = ({ user, onAddToCart }) => {
  return (
    <ListGroupItem as={"li"} key={user._id} onClick={() => onAddToCart(user)} className="rounded-pill user-list-item">
      {user.name}
    </ListGroupItem>
  );
};



export const UserBadge = ({ user, onRemove }) => {
  return (
    <Badge
      pill
      bg="dark"
      onClick={(e) => onRemove(user)}
      className="py-2 px-3 border border-info border-5"
      role="button"
    >
      {user.name} &nbsp; ❌
    </Badge>
  );
};
