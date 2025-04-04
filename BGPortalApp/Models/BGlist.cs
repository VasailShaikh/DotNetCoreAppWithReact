namespace BGPortalApp.Models
{
    public class BGlist
    {
        public int Id_RequestBG { get; set; }
        public string enc_id_rbg { get; set; }
        public int Id_BGType { get; set; }
        public string BGType { get; set; }
        public string ProjectCode { get; set; }
        public string BGName { get; set; }
        public string PONO { get; set; }
        public string IndexerPSNo { get; set; }
        public string BuyerPSNo { get; set; }
        public string BGProcessorPSNo { get; set; }
        public int Id_Stage { get; set; }
        public string VendorCode { get; set; }
        public System.DateTime BGExpiry { get; set; }
        public Nullable<System.DateTime> ClaimDate { get; set; }
        public string BGExpiryDisplay { get; set; }
        public Nullable<int> Id_InvocationReason { get; set; }
        public Nullable<System.DateTime> BGReturnDate { get; set; }
        public Nullable<int> Id_BankRefusalReason { get; set; }
        public string Stage { get; set; }
        public string LastActionBy { get; set; }
        public Nullable<System.DateTime> LastActionOn { get; set; }
        public Nullable<System.DateTime> DateAdded { get; set; }
        public decimal BGAmount { get; set; }
        public Nullable<bool> SoftCopySubmited { get; set; }
        public bool HardCopySubmited { get; set; }
        public string BankIntimationLetterPath { get; set; }
        public string ApproverGroup { get; set; }
        public string CourierDetailAfterClose { get; set; }
        public string BGReturnLetterPath { get; set; }
        public string BGReturnSignLetterPath { get; set; }
        public bool IsUnderQuery { get; set; }
        public bool HoldInvocation { get; set; }
        public string ClosedParkingNo { get; set; }        
        public string ActionbyHTML { get; set; }
        public string HardCopyStatus { get; set; }
        public string ActionButtonHTML { get; set; }
    }
}
