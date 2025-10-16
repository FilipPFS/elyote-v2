import SmsForm from "@/components/Communication/SmsForm";
import { getSmsTemplates } from "@/lib/actions/actions.templates";
import React from "react";

const CommunicationSms = async () => {
  const { sms } = await getSmsTemplates();

  return (
    <div className="flex items-center justify-center flex-1 px-4 py-6 md:px-20">
      <SmsForm sms={sms} />
    </div>
  );
};

export default CommunicationSms;
