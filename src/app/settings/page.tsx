import React from "react";
import Header from "../(components)/Header";

const Settings = async () => {

  // Redirect to sign-in page if no session exists
  

  // Extract user information from the session

  const labelStyles = "block text-sm font-medium dark:text-white";
  const textStyles =
    "mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:text-white";

  return (
    <div className="p-8">
      <Header name="Settings" />
      <div className="space-y-4">
        <div>
          <label className={labelStyles}>Username</label>
          <div className={textStyles}>{"N/A"}</div>
        </div>
        <div>
          <label className={labelStyles}>Email</label>
          <div className={textStyles}>{ "N/A"}</div>
        </div>
        <div>
          <label className={labelStyles}>Team</label>
          <div className={textStyles}>Development Team</div> {/* You can customize this based on your logic */}
        </div>
        <div>
          <label className={labelStyles}>Role</label>
          <div className={textStyles}>Developer</div> {/* You can customize this based on your logic */}
        </div>
      </div>
    </div>
  );
};

export default Settings;
