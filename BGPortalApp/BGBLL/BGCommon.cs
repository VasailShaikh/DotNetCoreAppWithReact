using BGPortalApp.BGDAL;
using BGPortalApp.Models;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Linq;

namespace BGPortalApp.BGBLL
{
    public class BGCommon
    {
        private readonly IConfiguration configuration;
        BGDetailsDAL bGDetailsDAL;
        public BGCommon(IConfiguration _configuration, ILogger loger)
        {
            configuration = _configuration;
            bGDetailsDAL = new BGDetailsDAL(configuration);
        }
        public List<StatusCount> GetBGDashboardCount(string PsNo)
        {
            List<StatusCount> ListStatusCount = new List<StatusCount>();

            ListStatusCount= bGDetailsDAL.GetBGDashboardCount(PsNo);
            return ListStatusCount;

        }

        public List<BGlist> BGRequestList(string role, string psno, int pageIndex, int pageSize, string filterText, int statusID, bool myPending, string sortBy)
        {
            List<BGlist> ListStatusCount = new List<BGlist>();

            ListStatusCount = bGDetailsDAL.BGRequestList(role,psno, pageIndex, pageSize,filterText,statusID,myPending,sortBy);
            return ListStatusCount;

        }
        
    }
}
