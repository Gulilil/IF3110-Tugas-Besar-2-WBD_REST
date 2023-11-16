import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

export class PhpController {
  get() {
    return async (req: Request, res: Response) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST','http://host.docker.internal:8001/api/anime/select.php', true);
      xhr.onload = function(){
        if (this.status == 200){
          console.log(this.responseText);
          res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            data: JSON.parse(this.responseText),
          })
        }
      }
      xhr.send(JSON.stringify({}));
    };
  }
}
