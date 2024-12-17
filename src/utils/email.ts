import config from "config";
import pug from "pug";
import axios from "axios";
import { convert } from "html-to-text";
import { Prisma } from "@prisma/client";
import { smsSend } from "./smsSend";

export default class Email {
  #firstName: string;
  #to: string;
  #from: string;
  constructor(private user: Prisma.UserCreateInput, private url: string) {
    this.#firstName = user.fname;
    this.#to = user.contactNo;
    this.#from = `Food Gate <admin@foodgate.com>`;
  }

  private newTransport(mailOptions, html) {
    // if (process.env.NODE_ENV === 'production') {
    // }
    const test = axios({
      method: "post",
      url: "",
      data: {
        body: html,
        email: mailOptions.to,
        type: {},
      },
    });
    return test;
  }

  private async send(template: string, subject: string) {
    // Generate HTML template based on the template string
    // const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
    //   firstName: this.#firstName,
    //   subject,
    //   url: this.url,
    // });
    // Create mailOptions
    const mailOptions = {
      to: this.#to,
      body: this.url,
    };
    // Send email
    const info = smsSend(mailOptions.to, mailOptions.body);
    console.log(info);
  }

  async sendVerificationCode() {
    await this.send("verificationCode", "Your account verification code");
  }

  async sendPasswordResetToken() {
    await this.send(
      "resetPassword",
      "Your password reset token (valid for only 10 minutes)"
    );
  }
}
