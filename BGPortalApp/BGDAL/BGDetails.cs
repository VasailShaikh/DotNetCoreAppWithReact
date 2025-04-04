using BGPortalApp.Models;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Data;
using static Azure.Core.HttpHeader;


namespace BGPortalApp.BGDAL
{

       
    public class BGDetailsDAL
    {
        private readonly IConfiguration configuration;
        private static string connectionString;
        public BGDetailsDAL(IConfiguration _configuration)
        {
            configuration = _configuration;
            connectionString = configuration.GetSection("ConnectionStrings").GetSection("SqlDbConnectionStr").Value.ToString();
        }

        public List<StatusCount> GetBGDashboardCount(string PSNo)
        {
            List<StatusCount> ListStatusCount = new List<StatusCount>();

            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    var parameters = new { @UserName = PSNo };
                    ListStatusCount = connection.Query<StatusCount>("USP_GetBGDashboardData", parameters, commandType: System.Data.CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return ListStatusCount;
        }

        public List<BGlist> BGRequestList(string role, string psno, int pageIndex, int pageSize, string filterText, int statusID, bool myPending, string sortBy)
        {
            List<BGlist> BgRequestList = null;

            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    var parameters = new DynamicParameters();

                    parameters.Add("@role", (!string.IsNullOrWhiteSpace(role) ? role : ""));
                    parameters.Add("@psno", (!string.IsNullOrWhiteSpace(psno) ? psno : ""));
                    parameters.Add("@PageIndex", pageIndex );
                    parameters.Add("@PageSize", pageSize);
                    if (!string.IsNullOrWhiteSpace(filterText))
                    {
                        parameters.Add("@FilterText",filterText);
                    }               
                    parameters.Add("@StageID", statusID > 0 ? statusID : -1 );
                    parameters.Add("@MyPending", myPending);
                    parameters.Add("@IsUnderQuery", false);
                    if (!string.IsNullOrWhiteSpace(sortBy))
                    {
                        parameters.Add("@SortBy", sortBy);
                    }
                    var res = connection.Query<BGlist>("sp_BGListRolewise", parameters, commandType: System.Data.CommandType.StoredProcedure).ToList();
                    if (res[0].Id_RequestBG > 0)
                    {
                        BgRequestList = res;
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return BgRequestList;
        }
    }
}
