const nodemailer = require("nodemailer");
import bcrypt from "bcryptjs";
import User from "@/models/userModels";



export const sendEmail = async ({ email, emailType, userId }: any) => {

    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10);
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 });
        }

        const emailVerify = ` < p > Click < a href = "${process.env.DOMAIN}/verifyemail?token=${hashedToken}" > here </a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. < br > ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
    </p>`
        const forgotPassword = ` < p > Click < a href = "${process.env.DOMAIN}/resetpassword?token=${hashedToken}" > here </a> to reset your password
        or copy and paste the link below in your browser. < br > ${process.env.DOMAIN}/resetpassword?token=${hashedToken}
    </p>`

        var transporter = nodemailer.createTransport({
            host: "live.smtp.mailtrap.io",
            port: 587,
            auth: {
                user: "api",
                pass: "ed91843679876c28e9c79b0696a663c0"
            }
        });

        const mailOptions = {

            from: 'noreply@demomailtrap.com', // sender address
            to: email, // list of receivers
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
            html: emailType === "VERIFY" ? emailVerify : forgotPassword


        }
        const response = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully", response);
        return response;
    } catch (error) {
        console.log("Error sending email", error);
        throw error;
    }
}
