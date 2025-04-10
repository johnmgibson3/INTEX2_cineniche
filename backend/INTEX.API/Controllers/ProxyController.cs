using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace INTEX.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProxyController : ControllerBase
    {
        private readonly IHttpClientFactory _clientFactory;
        private readonly ILogger<ProxyController> _logger;

        public ProxyController(IHttpClientFactory clientFactory, ILogger<ProxyController> logger)
        {
            _clientFactory = clientFactory;
            _logger = logger;
        }

        // In ProxyController.cs

        [HttpPost("recommendations")]
        public async Task<IActionResult> GetRecommendations([FromBody] object requestData)
        {
            try
            {
                _logger.LogInformation("Proxying recommendation request");
                _logger.LogInformation("Request data: {RequestData}", requestData);

                // Ensure the data structure is as expected
                var jsonString = System.Text.Json.JsonSerializer.Serialize(requestData);
                _logger.LogInformation("Serialized request: {JsonContent}", jsonString);

                // Rest of the code...

                // The ML service endpoint
                string mlEndpoint = "http://3c5634cf-0fa5-489a-bfb4-52d4d07cc9ca.eastus2.azurecontainer.io/score";
                string apiKey = "PBtt8FlaQLNTnnhvU6YzxZCdhp1Wycym";

                // Create HTTP client
                var client = _clientFactory.CreateClient();

                // Convert the request body to string
                string jsonContent = System.Text.Json.JsonSerializer.Serialize(requestData);
                _logger.LogInformation("Sending to ML service: {JsonContent}", jsonContent);

                // Create request message
                var request = new HttpRequestMessage(HttpMethod.Post, mlEndpoint)
                {
                    Content = new StringContent(jsonContent, Encoding.UTF8, "application/json")
                };

                // Add necessary headers
                request.Headers.Add("Authorization", $"Bearer {apiKey}");

                // Send the request
                var response = await client.SendAsync(request);

                // Log the response status code
                _logger.LogInformation($"ML service responded with status code: {response.StatusCode}");

                // Read the response content as string
                var responseContent = await response.Content.ReadAsStringAsync();
                _logger.LogInformation("ML service response: {ResponseContent}",
                    responseContent.Length > 500 ? responseContent.Substring(0, 500) + "..." : responseContent);

                // If the request was successful, return the response
                if (response.IsSuccessStatusCode)
                {
                    return Content(responseContent, "application/json");
                }

                // If not successful, log the error and return error status
                _logger.LogError($"ML service error: {responseContent}");
                return StatusCode((int)response.StatusCode, responseContent);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error proxying recommendation request");
                return StatusCode(500, "Error proxying recommendation request: " + ex.Message);
            }
        }
    }
}