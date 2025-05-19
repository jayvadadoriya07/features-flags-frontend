import { useFlags, useFlagsmith } from "flagsmith/react";
import { useEffect, useState } from "react";

function Segments() {
  const [isIdentified, setIsIdentified] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const flagsmithClient = useFlagsmith();
  const flags = useFlags(["can_delete", "can_edit", "can_view_reports"]);

  useEffect(() => {
    const identifyUser = async (userId: string, userRole: string, isPaid: boolean = false) => {
      const traits = {
        role: userRole,
        isPaid: String(isPaid) 
      };
      
      setUserInfo({
        userId,
        ...traits
      });
      
      console.log("Identifying with traits:", traits);
      
      try {
        await flagsmithClient.identify(userId, traits);
        console.log("User identified successfully");
        setIsIdentified(true);
      } catch (error) {
        console.error("Error identifying user:", error);
      }
    };
    
    const currentRole = "viewer";
    const isPaidUser = false; 
    
    identifyUser("87h", currentRole, isPaidUser);
  }, [flagsmithClient]);

  useEffect(() => {
    console.log("Flags updated:", flags);
  }, [flags]);

  if (!isIdentified) {
    return <div>Loading permissions...</div>;
  }

  const canEdit = flags.can_edit?.enabled || false;
  const canDelete = flags.can_delete?.enabled || false;
  const canViewReports = flags.can_view_reports?.enabled || false;

  return (
    <div>
      <h3>User Permissions</h3>
      <div><strong>User Info:</strong> {JSON.stringify(userInfo)}</div>
      <div className="mt-2">
        <div>Can Edit: {canEdit ? "Yes" : "No"}</div>
        <div>Can Delete: {canDelete ? "Yes" : "No"}</div>
        <div>Can View Reports: {canViewReports ? "Yes" : "No"}</div>
      </div>
      
      <div className="mt-4">
        {canEdit && <button className="mr-2 p-2 bg-blue-500 text-white rounded">Edit</button>}
        {canDelete && <button className="p-2 bg-red-500 text-white rounded">Delete</button>}
      </div>
    </div>
  );
}

export default Segments;