var config = require('config');
var models = require(global.modulePath('', 'model'));
var sequelize = models.sequelize;
var Shop = models.Shop;
var AWS = require('aws-sdk');
var nodemailer = require('nodemailer');
var sesTransport = require('nodemailer-ses-transport');

var s3 = new AWS.S3({
    accessKeyId: config.aws.accessKeyID,
    secretAccessKey: config.aws.secretAccessKey,
    region: config.aws.region
});

module.exports = {
    sendMail,
    verifyMail
}

function sendMail(req, res) {
    //var userAccountID = req.params.userAccountID;
    var userAccountID = '1';

    var _Shop = Shop.build();
    
    _Shop.getByUserAccountID2(userAccountID).then(function(shop) {
        var data_text = `
ข้อมูลร้านค้า
--------------------------
ชื่อร้านค้า : ${returnValue(shop.store.storeName)}        
ลงทะเบียนในนาม : ${returnValue(shop.store.businessType)}`;        
        if(shop.store.businessType == "บุคคล") {
            data_text += `

ชื่อ - นามสกุล ผู้ลงทะเบียน : ${returnValue(shop.store.individual.register.firstName)} ${returnValue(shop.store.individual.register.lastName)}
เลขบัตรประจำตัวประชาชน : ${returnValue(shop.store.individual.register.citizenID)}
เบอร์โทรศัพท์ : ${returnValue(shop.store.individual.register.phone)}
LINE ID : ${returnValue(shop.store.individual.register.lineID)}
อีเมล : ${returnValue(shop.store.individual.register.email)}
Facebook : ${returnValue(shop.store.individual.register.facebook)}

ชื่อ - นามสกุล ผู้ติดต่อ : ${returnValue(shop.store.individual.contact.firstName)} ${returnValue(shop.store.individual.contact.lastName)}
เลขบัตรประจำตัวประชาชน : ${returnValue(shop.store.individual.contact.citizenID)}
เบอร์โทรศัพท์ : ${returnValue(shop.store.individual.contact.phone)}
LINE ID : ${returnValue(shop.store.individual.contact.lineID)}
อีเมล : ${returnValue(shop.store.individual.contact.email)}
Facebook : ${returnValue(shop.store.individual.contact.facebook)}`;
        }
        else if(shop.store.businessType == "นิติบุคคล") {
            data_text += `

ชื่อนิติบุคคล  : ${returnValue(shop.store.company.register.companyPrefixName)} ${returnValue(shop.store.company.register.companyName)}
เลขบัตรประจำตัวผู้เสียภาษี : ${returnValue(shop.store.company.register.taxID)}
เบอร์โทรศัพท์ : ${returnValue(shop.store.company.register.phone)}
LINE ID : ${returnValue(shop.store.company.register.lineID)}
อีเมล : ${returnValue(shop.store.company.register.email)}
Facebook : ${returnValue(shop.store.company.register.facebook)}

ชื่อ - นามสกุล ผู้ติดต่อ : ${returnValue(shop.store.company.contact.firstName)} ${returnValue(shop.store.company.contact.lastName)}
เลขบัตรประจำตัวประชาชน : ${returnValue(shop.store.company.contact.citizenID)}
เบอร์โทรศัพท์ : ${returnValue(shop.store.company.contact.phone)}
LINE ID : ${returnValue(shop.store.company.contact.lineID)}
อีเมล : ${returnValue(shop.store.company.contact.email)}
Facebook : ${returnValue(shop.store.company.contact.facebook)}`;
        }
        data_text += `

ข้อมูลทางการเงิน
--------------------------
ชื่อธนาคาร : ${returnValue(shop.bank.bankName)}
เลขที่บัญชี : ${returnValue(shop.bank.accountNumber)}
สาขา : ${returnValue(shop.bank.bankBranch)}
ประเภทบัญชี : ${returnValue(shop.bank.accountType)}
ชื่อบัญชี : ${returnValue(shop.bank.accountName)}

ที่อยู่การรับสินค้า
--------------------------
รหัสไปรษณีย์ : ${returnValue(shop.address.pickup.zipCode)}
จังหวัด : ${returnValue(shop.address.pickup.province)}
เขต / อำเภอ : ${returnValue(shop.address.pickup.amphur)}
แขวง / ตำบล : ${returnValue(shop.address.pickup.district)}
ที่อยู่ : ${returnValue(shop.address.pickup.other)}

ที่อยู่การส่งเอกสาร
--------------------------
รหัสไปรษณีย์ : ${returnValue(shop.address.documentDrop.zipCode)}
จังหวัด : ${returnValue(shop.address.documentDrop.province)}
เขต / อำเภอ : ${returnValue(shop.address.documentDrop.amphur)}
แขวง / ตำบล : ${returnValue(shop.address.documentDrop.district)}
ที่อยู่ : ${returnValue(shop.address.documentDrop.other)}

ข้อมูลฝ่ายขาย
--------------------------
โปรโมชั่นโค๊ด : SELLBEJ
ค่าคอมมิชชั่น : 11%
ชื่อพนักงานฝ่ายขาย : T1001 จิรัฎฐ์ ทองคำชุม (เบสท์)
เบอร์โทรศัพท์ : 0917811877
LINE ID : lagobe.j
อีเมล : j@lagobe.com`;
        
        var data_html = `
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<div align="center">
    <div align="left" style="width: 600px; box-shadow: 1px 4px 10px rgba(0,0,0,.5);">
        <section style="margin-bottom: 10px;">
            <div style="height: 48px; background-color: #000080;"><span style="font-size: 18pt; font-weight: bold; color: white; margin-left: 15px;">ข้อมูลร้านค้า</span></div>
            <div style="font-size: 12pt; padding-top: 8px; padding-bottom: 10px; padding-left: 12px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="width: 50%;"><div style="width: 50%;"></div></td>
                        <td style="width: 50%;"><div style="width: 50%;"></div></td>
                    </tr>
                    <tr>
                        <td colspan="2">ชื่อร้านค้า : ${returnValue(shop.store.storeName)}</td>
                    </tr>
                    <tr>
                        <td colspan="2">ลงทะเบียนในนาม : ${returnValue(shop.store.businessType)}</td>
                    </tr>
                    <tr>
                        <td colspan="2">&nbsp;</td>
                    </tr>`;                    
        if(shop.store.businessType == "บุคคล") {
            data_html += `
                    <tr>
                        <td colspan="2">ชื่อ - นามสกุล ผู้ลงทะเบียน : ${returnValue(shop.store.individual.register.firstName)} ${returnValue(shop.store.individual.register.lastName)}</td>
                    </tr>
                    <tr>
                        <td colspan="2">เลขบัตรประจำตัวประชาชน : ${returnValue(shop.store.individual.register.citizenID)}</td>
                    </tr>
                    <tr>
                        <td>เบอร์โทรศัพท์ : ${returnValue(shop.store.individual.register.phone)}</td>
                        <td>LINE ID : ${returnValue(shop.store.individual.register.lineID)}</td>
                    </tr>
                    <tr>
                        <td>อีเมล : ${returnValue(shop.store.individual.register.email)}</td>
                        <td>Facebook : ${returnValue(shop.store.individual.register.facebook)}</td>
                    </tr>
                    <tr>
                        <td colspan="2">&nbsp;</td>
                    </tr>
                    <tr>
                        <td colspan="2">ชื่อ - นามสกุล ผู้ติดต่อ : ${returnValue(shop.store.individual.contact.firstName)} ${returnValue(shop.store.individual.contact.lastName)}</td>
                    </tr>
                    <tr>
                        <td colspan="2">เลขบัตรประจำตัวประชาชน : ${returnValue(shop.store.individual.contact.citizenID)}</td>
                    </tr>
                    <tr>
                        <td>เบอร์โทรศัพท์ : ${returnValue(shop.store.individual.contact.phone)}</td>
                        <td>LINE ID : ${returnValue(shop.store.individual.contact.lineID)}</td>
                    </tr>
                    <tr>
                        <td>อีเมล : ${returnValue(shop.store.individual.contact.email)}</td>
                        <td>Facebook : ${returnValue(shop.store.individual.contact.facebook)}</td>
                    </tr>`;
        }
        else if(shop.store.businessType == "นิติบุคคล") {
            data_html += `
                    <tr>
                        <td colspan="2">ชื่อนิติบุคคล  : ${returnValue(shop.store.company.register.companyPrefixName)} ${returnValue(shop.store.company.register.companyName)}</td>
                    </tr>
                    <tr>
                        <td colspan="2">เลขบัตรประจำตัวผู้เสียภาษี : ${returnValue(shop.store.company.register.taxID)}</td>
                    </tr>
                    <tr>
                        <td>เบอร์โทรศัพท์ : ${returnValue(shop.store.company.register.phone)}</td>
                        <td>LINE ID : ${returnValue(shop.store.company.register.lineID)}</td>
                    </tr>
                    <tr>
                        <td>อีเมล : ${returnValue(shop.store.company.register.email)}</td>
                        <td>Facebook : ${returnValue(shop.store.company.register.facebook)}</td>
                    </tr>
                    <tr>
                        <td colspan="2">&nbsp;</td>
                    </tr>
                    <tr>
                        <td colspan="2">ชื่อ - นามสกุล ผู้ติดต่อ : ${returnValue(shop.store.company.contact.firstName)} ${returnValue(shop.store.company.contact.lastName)}</td>
                    </tr>
                    <tr>
                        <td colspan="2">เลขบัตรประจำตัวประชาชน : ${returnValue(shop.store.company.contact.citizenID)}</td>
                    </tr>
                    <tr>
                        <td>เบอร์โทรศัพท์ : ${returnValue(shop.store.company.contact.phone)}</td>
                        <td>LINE ID : ${returnValue(shop.store.company.contact.lineID)}</td>
                    </tr>
                    <tr>
                        <td>อีเมล : ${returnValue(shop.store.company.contact.email)}</td>
                        <td>Facebook : ${returnValue(shop.store.company.contact.facebook)}</td>
                    </tr>`;
        }
        data_html += `
                </table>
            </div>
        </section>
        <section style="margin-bottom: 10px;">
            <div style="height: 48px; background-color: #000080;"><span style="font-size: 18pt; font-weight: bold; color: white; margin-left: 15px;">ข้อมูลทางการเงิน</span></div>
            <div style="font-size: 12pt; padding-top: 10px; padding-bottom: 10px; padding-left: 12px;">
                <div style="height: 29px;"><span>ชื่อธนาคาร : ${returnValue(shop.bank.bankName)}</span></div>
                <div style="height: 29px;"><span>เลขที่บัญชี : ${returnValue(shop.bank.accountNumber)}</span></div>
                <div style="height: 29px;"><span>สาขา : ${returnValue(shop.bank.bankBranch)}</span></div>
                <div style="height: 29px;"><span>ประเภทบัญชี : ${returnValue(shop.bank.accountType)}</span></div>
                <div style="height: 29px;"><span>ชื่อบัญชี : ${returnValue(shop.bank.accountName)}</span></div>
            </div>
        </section>
        <section style="margin-bottom: 10px;">
            <div style="height: 48px; background-color: #000080;"><span style="font-size: 18pt; font-weight: bold; color: white; margin-left: 15px;">ที่อยู่การรับสินค้า</span></div>
            <div style="font-size: 12pt; padding-top: 10px; padding-bottom: 10px; padding-left: 12px;">
                <div style="height: 29px;"><span>รหัสไปรษณีย์ : ${returnValue(shop.address.pickup.zipCode)}</span></div>
                <div style="height: 29px;"><span>จังหวัด : ${returnValue(shop.address.pickup.province)}</span></div>
                <div style="height: 29px;"><span>เขต / อำเภอ : ${returnValue(shop.address.pickup.amphur)}</span></div>
                <div style="height: 29px;"><span>แขวง / ตำบล : ${returnValue(shop.address.pickup.district)}</span></div>
                <div style="height: 29px;"><span>ที่อยู่ : ${returnValue(shop.address.pickup.other)}</span></div>
            </div>
        </section>
        <section style="margin-bottom: 10px;">
            <div style="height: 48px; background-color: #000080;"><span style="font-size: 18pt; font-weight: bold; color: white; margin-left: 15px;">ที่อยู่การส่งเอกสาร</span></div>
            <div style="font-size: 12pt; padding-top: 10px; padding-bottom: 10px; padding-left: 12px;">
                <div style="height: 29px;"><span>รหัสไปรษณีย์ : ${returnValue(shop.address.documentDrop.zipCode)}</span></div>
                <div style="height: 29px;"><span>จังหวัด : ${returnValue(shop.address.documentDrop.province)}</span></div>
                <div style="height: 29px;"><span>เขต / อำเภอ : ${returnValue(shop.address.documentDrop.amphur)}</span></div>
                <div style="height: 29px;"><span>แขวง / ตำบล : ${returnValue(shop.address.documentDrop.district)}</span></div>
                <div style="height: 29px;"><span>ที่อยู่ : ${returnValue(shop.address.documentDrop.other)}</span></div>
            </div>
        </section>
        <section style="margin-bottom: 10px;">
            <div style="height: 48px; background-color: #000080;"><span style="font-size: 18pt; font-weight: bold; color: white; margin-left: 15px;">ข้อมูลฝ่ายขาย</span></div>
            <div style="font-size: 12pt; padding-top: 10px; padding-bottom: 10px; padding-left: 12px;">
                <div style="height: 29px;"><span>โปรโมชั่นโค๊ด : SELLBEJ</span></div>
                <div style="height: 29px;"><span>ค่าคอมมิชชั่น : 11%</span></div>
                <div style="height: 29px;"><span>ชื่อพนักงานฝ่ายขาย : T1001 จิรัฎฐ์ ทองคำชุม (เบสท์)</span></div>
                <div style="height: 29px;"><span>เบอร์โทรศัพท์ : 0917811877</span></div>
                <div style="height: 29px; line-height: 29px;"><span>LINE ID : lagobe.j</span></div>
                <div style="height: 29px;"><span>อีเมล : j@lagobe.com</span></div>
            </div>
        </section>
    </div>
</div>`;
        
        var data_attachments = [];
        if(shop.store.businessType == "บุคคล") {
            if (shop.store.individual.document.citizenCard) {
                var citizenCardKey = shop.store.individual.document.citizenCard;
                var citizenCardURL = s3.getSignedUrl('getObject', {
                    Bucket: config.aws.s3Bucket,
                    Key: citizenCardKey
                });
                var citizenCardFilename = citizenCardKey.substring(citizenCardKey.lastIndexOf('/')+1);
                data_attachments.push({
                    path: citizenCardURL,
                    filename: citizenCardFilename
                });
            }
            if (shop.store.individual.document.homeRegister) {
                var homeRegisterKey = shop.store.individual.document.homeRegister;
                var homeRegisterURL = s3.getSignedUrl('getObject', {
                    Bucket: config.aws.s3Bucket,
                    Key: homeRegisterKey
                });
                var homeRegisterFilename = homeRegisterKey.substring(homeRegisterKey.lastIndexOf('/')+1);
                data_attachments.push({
                    path: homeRegisterURL,
                    filename: homeRegisterFilename
                });
            }
        }
        else if(shop.store.businessType == "นิติบุคคล") {
            if (shop.store.company.document.companyCertificate) {
                var companyCertificateKey = shop.store.company.document.companyCertificate;
                var companyCertificateURL = s3.getSignedUrl('getObject', {
                    Bucket: config.aws.s3Bucket,
                    Key: companyCertificateKey
                });
                var companyCertificateFilename = companyCertificateKey.substring(companyCertificateKey.lastIndexOf('/')+1);
                data_attachments.push({
                    path: companyCertificateURL,
                    filename: companyCertificateFilename
                });
            }
            if (shop.store.company.document.tradeRegister) {
                var tradeRegisterKey = shop.store.company.document.tradeRegister;
                var tradeRegisterURL = s3.getSignedUrl('getObject', {
                    Bucket: config.aws.s3Bucket,
                    Key: tradeRegisterKey
                });
                var tradeRegisterFilename = tradeRegisterKey.substring(tradeRegisterKey.lastIndexOf('/')+1);
                data_attachments.push({
                    path: tradeRegisterURL,
                    filename: tradeRegisterFilename
                });
            }
        }
        
        var transporter = nodemailer.createTransport(sesTransport({
            accessKeyId: config.aws.accessKeyID,
            secretAccessKey: config.aws.secretAccessKey,
            region: 'us-east-1'
        }));
        
        transporter.sendMail({
            from: 'Manit <a@lagobe.com>',
            //to: 'amashinji@gmail.com',
            to: 'a@lagobe.com',
            subject: 'My Amazon SES Email with Attachment',
            text: data_text.trim(),
            html: data_html.trim(),
            attachments: data_attachments
        }, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
            
            res.status(200).send("sended");
        });
    });
    
    function returnValue(value) {
        return value? value: "-";
    }
}

function verifyMail(req, res) {
    //ses.setIdentityMailFromDomain({
    //    BehaviorOnMXFailure: "UseDefaultValue", 
    //    Identity: "a@lagobe.com", 
    //    MailFromDomain: "bounce.lagobe.com"
    //}, function (err, message) {
    //    console.log(err || message);
    //    
    //    res.status(200).send("Send Verify uuu");
    //    
    //    ses.verifyEmailIdentity({
    //        EmailAddress: req.params.email
    //    }, function (err, message) {
    //        console.log(err || message);
    //    
    //        res.status(200).send("Send Verify u");
    //    });
    //});
    
        
    
    
    
    
    
    //ses.setIdentityMailFromDomain({
    //    BehaviorOnMXFailure: "UseDefaultValue", 
    //    Identity: "a@lagobe.com", 
    //    MailFromDomain: "bounce.lagobe.com"
    //});
    
    ses.verifyEmailIdentity({
        EmailAddress: req.params.email
    }, function (err, message) {
        console.log(err || message);
    
        res.status(200).send("Send Verify u");
    });
    
    
    //console.log(ses.getIdentityVerificationAttributes());
    
    
    //console.log(ses.IdentityMailFromDomainAttributes()); 
    
    
    //console.log(ses.getIdentityMailFromDomainAttributes());
    //res.status(200).send("Send Verify xxx");
    //var params = {
    //    EmailAddress: req.params.email
    //};
    //ses.verifyEmailIdentity(params, function (err, message) {
    //    console.log(err || message);
    //
    //    res.status(200).send("Send Verify");
    //});
}