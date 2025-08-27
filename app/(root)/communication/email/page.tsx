import MailForm from "@/components/Communication/MailForm";
import { getMailTemplates } from "@/lib/actions/actions.templates";
import React from "react";

const CommunicationEmail = async () => {
  const { mail } = await getMailTemplates();

  console.log("mails", mail);

  return (
    <div className="flex items-center justify-center flex-1 px-4 py-6 md:px-20">
      <MailForm mails={mail} />
    </div>
  );
};

export default CommunicationEmail;
