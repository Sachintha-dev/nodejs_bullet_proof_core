const soapRequest = require("easy-soap-request");
const fs = require("fs-extra");

const url =
  "http://lankagate.gov.lk:9080/services/GovSMSMTHandlerProxy.GovSMSMTHandlerProxyHttpSoap11Endpoint";
const sampleHeaders = {
  "user-agent": "sampleTest",
  "Content-Type": "text/xml;charset=UTF-8",
  soapAction: "http://lankagate.gov.lk:9080/services/GovSMSMTHandlerProxy?wsdl",
};

export const smsSend = async (mobileNo: string, message: string) => {
  try {
    const xml =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:v1="http://schemas.icta.lk/xsd/kannel/handler/v1/" soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"> <soapenv:Header><govsms:authData xmlns:govsms="http://govsms.icta.lk/"> <govsms:user>icta</govsms:user><govsms:key>g0v5ms123</govsms:key></govsms:authData></soapenv:Header><soapenv:Body><v1:SMSRequest><v1:requestData><v1:outSms>' +
      message +
      "</v1:outSms> <v1:recepient>" +
      mobileNo +
      "</v1:recepient> <v1:depCode>IctaTest</v1:depCode><v1:smscId/><v1:billable/></v1:requestData></v1:SMSRequest></soapenv:Body></soapenv:Envelope>";
    const { response } = await soapRequest({
      url: url,
      headers: sampleHeaders,
      xml: xml,
      timeout: 10000,
    }); // Optional timeout parameter(milliseconds)
    const { headers, body, statusCode } = response;
  } catch (error) {
    console.log(error);
  }
};
