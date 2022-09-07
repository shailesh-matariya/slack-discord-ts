import React from "react";

const User = (props: any) => {
  //   console.log(msgDetail, isReplyVisible);
  var msgDetail = props.msgDetail;
  var users = props.users;
  console.log(
    "user",
    users.filter((user: any) => user.userId == msgDetail.userId)
  );

  return (
    <>
      {/* {msgDetail.replies && msgDetail.replies.length != 0 && (
        <b>isReplyVisible</b>
      )} */}
      {/* <b>isReplyVisible</b> */}
    </>
  );
};
export default User;
