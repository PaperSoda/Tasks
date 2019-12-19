using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using Newtonsoft.Json;

namespace Comments
{
    class Program
    {
        static void Main(string[] args)
        {
            var searchDir = args[0];
            var rootDir = GetRootDirectory();
            if (!Directory.Exists(searchDir))
                throw new Exception("directory not found");

            var searchPattern = "*.txt";

            List<string> viableExtensions = GetViableExtensions(rootDir);

            string fileSearchPattern = BuildFileSearchPattern(viableExtensions);

            // with built pattern throws illegal character in path exception.
            var files = Directory.EnumerateFiles(searchDir, searchPattern, SearchOption.AllDirectories);

            var pattern = $"{RegexPatterns.InlineComments}|{RegexPatterns.MultilineComments}";
            var regex = new Regex(pattern, RegexOptions.Multiline);

            var fullFilePath = Path.Combine(rootDir, "comments.txt");

            if (File.Exists(fullFilePath))
                File.Delete(fullFilePath);

            using (var fs = File.Create(fullFilePath))
            {
                foreach (var filePath in files)
                {
                    var fileName = Path.GetFileName(filePath);
                    var decoratedFileName = $"==============={fileName}===============\n";

                    var content = File.ReadAllText(filePath);

                    var matches = regex.Matches(content);

                    if (matches.Count > 0)
                        fs.Write(new UTF8Encoding(true).GetBytes(decoratedFileName), 0, decoratedFileName.Length);

                    for (var i = 0; i < matches.Count; ++i)
                    {
                        var comment = new UTF8Encoding(true).GetBytes($"{i + 1}. {matches[i].Value}");
                        fs.Write(comment, 0, comment.Length);
                    }
                }
            }

            Console.ReadKey();
        }

        private static string GetRootDirectory()
        {
            return Directory
                .GetParent(Directory
                    .GetParent(Directory
                        .GetCurrentDirectory()).ToString())
                .ToString();
        }

        private static List<string> GetViableExtensions(string rootDir)
        {
            var configPath = $@"{rootDir}\config.json";

            if (!Directory.Exists(rootDir))
                throw new Exception("directory not found");

            if (!File.Exists(configPath))
                throw new Exception("config file does not exist");

            using (var reader = new StreamReader(configPath))
            {
                var json = reader.ReadToEnd();
                return JsonConvert.DeserializeObject<Config>(json).ViableExtensions.ToList();
            }
        }

        private static string BuildFileSearchPattern(IReadOnlyList<string> viableExtensions)
        {
            var fileSearchPattern = "(";

            for (var i = 0; i < viableExtensions.Count; i++)
            {
                fileSearchPattern += $@"({viableExtensions[i]})";
                if (i != viableExtensions.Count-1)
                    fileSearchPattern += "|";
            }

            fileSearchPattern += ")";
            return fileSearchPattern;
        }
    }
}
