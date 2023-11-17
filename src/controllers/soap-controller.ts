import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

import { AuthRequest } from "../middlewares/authentication-middleware";
import { soapConfig } from "../config/soap-config";
import axios from "axios";
import xml2js from "xml2js";
import converter from "xml-js";

const soapRequest = require("easy-soap-request");

const SOAP_HEADERS = {
      "Content-Type": "text/xml;charset=UTF-8",
      "X-API-KEY" : soapConfig.key || "REST",
    };

const SOAP_URL = 'http://host.docker.internal:8001/ws/reference?wsdl';

interface ReferenceRequest {
    forumAccountId: number;
    referralCode : string;
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
          const xml=`<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                            <Body>
                                <updateReferenceEstablishLink xmlns="http://service.wbd_soap.com/">
                                    <arg0 xmlns="">${forumAccountId}</arg0>
                                    <arg1 xmlns="">${referralCode}</arg1>
                                </updateReferenceEstablishLink>
                            </Body>
                          </Envelope>`;

          const response = await fetch (SOAP_URL, {
            headers: SOAP_HEADERS,
            method: "POST",
            body: xml,
          });

          const text: string = await response.text();
          const json = JSON.parse(converter.xml2json(text, {compact:true, spaces: 4}));
          const val = json["S:Envelope"]["S:Body"]["ns2:updateReferenceEstablishLink"]["return"];
          
          if (!val){
            res.status(StatusCodes.NOT_FOUND).json({
              message: ReasonPhrases.NOT_FOUND,
            })
            return;
          } else {
            res.status(StatusCodes.OK).json({
              message: val,
            })
            return;
          }}
        }


        get() {
          return async (req: Request, res: Response) => {
            const { token } = req as AuthRequest;
            if (!token) {
              res.status(StatusCodes.UNAUTHORIZED).json({
                message: ReasonPhrases.UNAUTHORIZED,
              })
              return;
            }

          const forumAccountId = token.id;
          const xml = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"><Body><giveReferenceDataWithForumAccountID xmlns="http://service.wbd_soap.com/"><arg0 xmlns="">${forumAccountId}</arg0></giveReferenceDataWithForumAccountID></Body></Envelope>`;
          const response = await fetch (SOAP_URL, {
            headers: SOAP_HEADERS,
            method: "POST",
            body: xml,
          });

          const text: string = await response.text();
          const json = JSON.parse(converter.xml2json(text, {compact:true, spaces: 4}));
          const val = json["S:Envelope"]["S:Body"]["ns2:giveReferenceDataWithForumAccountIDResponse"]["return"];
          
          if (!val){
            res.status(StatusCodes.NOT_FOUND).json({
              message: ReasonPhrases.NOT_FOUND,
            })
            return;
          } else {
            res.status(StatusCodes.OK).json({
              message: val,
            })
            return;
          }}
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
          const xml = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
                                <Body>
                                    <updateReferenceUnlink xmlns="http://service.wbd_soap.com/">
                                        <arg0 xmlns="">${forumAccountId}</arg0>
                                    </updateReferenceUnlink>
                                </Body>
                            </Envelope>`;

          const response = await fetch (SOAP_URL, {
            headers: SOAP_HEADERS,
            method: "POST",
            body: xml,
          });
          const text: string = await response.text();
          const json = JSON.parse(converter.xml2json(text, {compact:true, spaces: 4}));
          const val = json["S:Envelope"]["S:Body"]["ns2:updateReferenceUnlink"]["return"];
          
          if (!val){
            res.status(StatusCodes.NOT_FOUND).json({
              message: ReasonPhrases.NOT_FOUND,
            })
            return;
          } else {
            res.status(StatusCodes.OK).json({
              message: val,
            })
            return;
          }}
        }

}
