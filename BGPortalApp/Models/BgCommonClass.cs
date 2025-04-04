using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Runtime.Serialization;
using System.Web;

namespace BGPortalApp.Models
{
    public class BGAttachment_Model
    {
        //public BGRequest_ViewModel BGRequest_ViewModels { get; set; }
        //public List<InvoiceUploadModel> BGAttachments { get; set; }
        //public List<InvoiceUploadModel> InvoiceUploadModels { get; set; }
        //public List<BGAttachment> VendorUploadDoc { get; set; }
        //public List<BGAttachmentVM> BGAttachmentView { get; set; }
        //public string Buyer_Email { get; set; }
        //public string ActionName { get; set; }
    }


    public class InvoiceUploadModel
    {
        public int Id_BGRequest { get; set; }
        public int SRNo { get; set; }
        public string Path { get; set; }
        public string Path_Base { get; set; }
        public string AttachmentName { get; set; }
        public string Category { get; set; }
        public string FileType { get; set; }
        public bool IsActive { get; set; }
        public int IsUploaded { get; set; }
    }

    public enum BGStageEnum
    {
        [EnumMember(Value = "Pending With Indexer")]
        PendingAtIndexer = 0,
        [EnumMember(Value = "Approved By Indexer")]
        ApprovedByIndexer = 1,
        [EnumMember(Value = "Approved By BG PROCESSOR")]
        ApprovedByBGProcessor = 2,
        [EnumMember(Value = "Data Pushed In SAP")]
        DataPushedInSAP = 3,
        [EnumMember(Value = "Return BG - Pending With Buyer")]
        ReturnBG_PendingAtBuyerOrPM = 4,
        [EnumMember(Value = "Return BG - Pending With BG Processor")]
        ReturnBG_PendingAtFandA = 5,
        [EnumMember(Value = "Return BG - Hold By Buyer")]
        ReturnBG_HoldByBuyerOrPM = 6,
        [EnumMember(Value = "BG Closed")]
        BGClosed = 7,
        [EnumMember(Value = "Hardcopy Returned")]
        HardCopyReturned = 8,
        [EnumMember(Value = "Return BG - Hold By BG Processor")]
        ReturnBG_HoldByBGProcessor = 9,

        [EnumMember(Value = "ReturnBG - Success")]
        ReturnBG_Success = 10,
        [EnumMember(Value = "BG Expired-Awaiting Extension")]
        BGExpiredAwaitingExtension = 11,
        [EnumMember(Value = "On Hold")]
        OnHold = 12,
        [EnumMember(Value = "Amend Request Sent to Vendor")]
        AmendRequest = 13,
        [EnumMember(Value = "Pending With AI Verification")]
        AIValidation = 14,
        [EnumMember(Value = "Processed by AI Verification")]
        ValidatedByAI = 15
    }
    public enum BGStageEnum1
    {
        [EnumMember(Value = "Pending With Indexer")]
        PendingAtIndexer = 0,
        [EnumMember(Value = "Approved By Indexer")]
        ApprovedByIndexer = 1,
        [EnumMember(Value = "Approved By BG PROCESSOR")]
        ApprovedByBGProcessor = 2,
        [EnumMember(Value = "Data Pushed In SAP")]
        DataPushedInSAP = 3,
        [EnumMember(Value = "Return BG - Pending With Buyer")]
        ReturnBG_PendingAtBuyerOrPM = 4,
        [EnumMember(Value = "Return BG - Pending With BG Processor")]
        ReturnBG_PendingAtFandA = 5,
        [EnumMember(Value = "ReturnBG - Success")]
        ReturnBG_Success = 6,
        [EnumMember(Value = "BG Closed")]
        BGClosed = 7,
        [EnumMember(Value = "Hardcopy Returned")]
        HardCopyReturned = 8,
        [EnumMember(Value = "On Hold")]
        OnHold = 9,
        [EnumMember(Value = "Return BG - Hold By Buyer")]
        ReturnBG_HoldByBuyerOrPM = 10,
        [EnumMember(Value = "BG Expired-Awaiting Extension")]
        BGExpiredAwaitingExtension = 11,
        [EnumMember(Value = "Return BG - Hold By BG Processor")]
        ReturnBG_HoldByBGProcessor = 12
    }
    public enum ApproverGroup
    {
        //[EnumMember(Value = "A")]
        //A,
        [EnumMember(Value = "B")]
        B,
        [EnumMember(Value = "C")]
        C
    }
    public enum RolesEnum
    {
        [EnumMember(Value = "VENDOR")]
        Vendor = 1,
        [EnumMember(Value = "BG PROCESSOR")]
        BGProcessor = 2,
        [EnumMember(Value = "ADMIN")]
        Admin = 3,
        [EnumMember(Value = "BUYER")]
        Buyer = 4,
        [EnumMember(Value = "INDEXER")]
        Indexer = 5,
        [EnumMember(Value = "LEADBUYER")]
        LeadBuyer = 6,
        [EnumMember(Value = "LEADANDBUYER")]
        LeadandBuyer = 7
    }
    public enum BGEmailInstanceEnum
    {
        RequestSubmit = 1,
        AmendRequest = 2,
        SendMessage = 3,
        RejectSoftCopy = 4,
        RejectHardCopy = 5,
        SendReject = 6,
        ReturnBG = 7,
        UpdateSoftCopy = 8,
        HardCopyApproved = 9,
        ChangeBuyer = 10,
        ApproveL1 = 11,
        ApproveL2 = 12,
        ReturnBGToIndexer = 13,
        ReturnBGHoldByBuyer = 14,
        BGAboutToExpire = 15,
        BGSendInvocationMailToBank = 16,
        BGInvocationRequest = 17,
        ReturnBGToBgProcess = 18,
        ReturnBGSucess = 19,
        HardCopyReturn = 20,
        ReturnBGHoldByProccesor = 21,
        Invocation = 23,
        BGHardCopyPending = 24,
        BGAutoDelete = 25,
        BGInward = 26,
        FailPushedToSAP = 27,
        OTP = 28,
        QueryResponse = 29,
        NewBGQuery = 30,
        ReturnBG1 = 31,
        WithdrawalLetter = 32,
        HoldInvocation = 33,
        SFMS = 34
    }

    public enum DocumentType
    {
        BGSCAN = 1,
        OTHER = 2,
        DISCREPANCY = 3,
        [EnumMember(Value = "F&A Approval")]
        APPROVAL = 4,
        AMEND = 5,
        NEWOTHER = 6
    }

    public class BGInvocationModel
    {
        public BGlist BGRequest { get; set; }
        public BGlist BGRequest_ViewModels { get; set; }

        //public HttpPostedFile _file { get; set; }
}
        
}
