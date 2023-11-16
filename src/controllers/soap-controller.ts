import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

import { AuthRequest } from "../middlewares/authentication-middleware";
import { soapConfig } from "../config/soap-config";
import axios from "axios";
import xml2js from "xml2js";

const SOAP_HEADERS = 
    {
      "Content-Type": "text/xml",
      "X-API-KEY" : soapConfig.key,
    };

interface ReferenceRequest {
    forumAccountId: number;
    referralCode : string;
}

interface ReferenceData {
    id : number;
    animeAccountId: number;
    forumAccountId: number;
    referralCode: string;
    point: number;
}

export class SoapController {
      link (){
        return async (req: Request, res: Response) => {
          const { token } = req as AuthRequest;
          if (!token){
            res.status(StatusCodes.UNAUTHORIZED).json({
              message: ReasonPhrases.UNAUTHORIZED,
            });
            return;
          }

          const forumAccountId = token.id;
          const { referralCode} : ReferenceRequest = req.body;
          const reqParam =`<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                            <Body>
                                <updateReferenceEstablishLink xmlns="http://service.wbd_soap.com/">
                                    <arg0 xmlns="">${forumAccountId}</arg0>
                                    <arg1 xmlns="">${referralCode}</arg1>
                                </updateReferenceEstablishLink>
                            </Body>
                          </Envelope>`;

          try {
            const response = await axios.post<string>(
              `http://${soapConfig.host}:${soapConfig.host}/api/reference`,
              reqParam,
              {
                headers: SOAP_HEADERS,
              }
            );
            const xml = await xml2js.parseStringPromise(response.data);
            const result = 
              xml["S:Envelope"]["S:Body"][0]["ns2:updateReferenceEstablishLinkResponse"][0].return[0];
            
            if (result.include("Successfully")){
              res.status(StatusCodes.OK).json({
                message: result,
              })
            } else if (result.include("Invalid")){
              res.status(StatusCodes.UNAUTHORIZED).json({
                message: result,
              })
            } else if (result.include("not found")){
              res.status(StatusCodes.NOT_FOUND).json({
                message: result,
              })
            } else {
              res.status(StatusCodes.BAD_REQUEST).json({
                message: result,
              })
            }
          } catch (error){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
              message: ReasonPhrases.INTERNAL_SERVER_ERROR,
            });
            return;
          }
        }
      }

      get (){
        return async (req: Request, res: Response) => {
          const { token } = req as AuthRequest;
          if (!token){
            res.status(StatusCodes.UNAUTHORIZED).json({
              message: ReasonPhrases.UNAUTHORIZED,
            });
            return;
          }
  
          const forumAccountId = token.id;
          const reqParam = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                                <Body>
                                    <giveReferenceDataWithForumAccountID xmlns="http://service.wbd_soap.com/">
                                        <arg0 xmlns="">${forumAccountId}</arg0>
                                    </giveReferenceDataWithForumAccountID>
                                </Body>
                            </Envelope>`;
          try {
            const response = await axios.post<string>(
              `http://${soapConfig.host}:${soapConfig.host}/api/reference`,
              reqParam,
              {
                headers: SOAP_HEADERS,
              }
            );
            console.log(response);

            const xml = await xml2js.parseStringPromise(response.data);
            const result = 
              xml["S:Envelope"]["S:Body"][0]["ns2:giveReferenceDataWithForumAccountIDResponse"][0].return[0];
            
            if (result.include("Invalid")){
              res.status(StatusCodes.UNAUTHORIZED).json({
                message: result,
              })
              return
            }

            const obj = JSON.parse(result);
            const data = obj.data;
            if (data.length == 0){
              res.status(StatusCodes.NOT_FOUND).json({
                message: "Not Found",
              })
            } else {
              res.status(StatusCodes.OK).json({
                message: data[0],
              })
            }
          } catch (error){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
              message: ReasonPhrases.INTERNAL_SERVER_ERROR,
            });
            return;
          }
        }
      }

      unlink (){
        return async (req: Request, res: Response) => {
          const { token } = req as AuthRequest;
          if (!token){
            res.status(StatusCodes.UNAUTHORIZED).json({
              message: ReasonPhrases.UNAUTHORIZED,
            });
            return;
          }


          const forumAccountId = token.id;
          const reqParam = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                                <Body>
                                    <updateReferenceUnlink xmlns="http://service.wbd_soap.com/">
                                        <arg0 xmlns="">${forumAccountId}</arg0>
                                    </updateReferenceUnlink>
                                </Body>
                            </Envelope>`;

          try {
            const response = await axios.post<string>(
              `http://${soapConfig.host}:${soapConfig.host}/api/reference`,
              reqParam,
              {
                headers: SOAP_HEADERS,
              }
            );
            const xml = await xml2js.parseStringPromise(response.data);
            const result = 
              xml["S:Envelope"]["S:Body"][0]["ns2:updateReferenceUnlinkResponse"][0].return[0];
            
            if (result.include("Successfully")){
              res.status(StatusCodes.OK).json({
                message: result,
              })
            } else if (result.include("Invalid")){
              res.status(StatusCodes.UNAUTHORIZED).json({
                message: result,
              })
            } else {
              res.status(StatusCodes.BAD_REQUEST).json({
                message: result,
              })
            }
          } catch (error){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
              message: ReasonPhrases.INTERNAL_SERVER_ERROR,
            });
            return;
          }
        }
      }

}
