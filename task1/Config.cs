using System.Collections.Generic;
using Newtonsoft.Json;

namespace Comments
{
    class Config
    {
        [JsonProperty("viableExtensions")] public ICollection<string> ViableExtensions { get; set; }
    }
}
