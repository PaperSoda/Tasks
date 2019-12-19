namespace Comments
{
    class RegexPatterns
    {
        public const string InlineComments = @"((//.*)((?!\"").)$)";
        public const string MultilineComments = @"(/\*([^*]*\*)*?/)";
    }
}
