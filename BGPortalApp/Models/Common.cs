using LTEH_SecurityV001;

namespace BGPortalApp.Models
{
    public static class Common
    {

        public static string Decrypt(this string cipherText)
        {
            try
            {
                string enc = _Security.DecryptString("BGApp", cipherText);
                if (enc.StartsWith("success:"))
                {
                    return enc.Replace("success:", "");
                }
                return cipherText;
            }
            catch (Exception)
            {
                return cipherText;
            }
        }

        public static string Encrypt(this string clearText)
        {
            try
            {
                string dec = _Security.EncryptString("BGApp", clearText);
                if (dec.StartsWith("success:"))
                {
                    return dec.Replace("success:", "");
                }
                return clearText;
            }
            catch (Exception)
            {
                return clearText;
            }
        }
    }
}
