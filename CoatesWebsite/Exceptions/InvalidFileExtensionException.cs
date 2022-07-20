using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoatesWebsite.Exceptions
{
    public class InvalidFileExtensionException : Exception
    {
        public InvalidFileExtensionException(string message) : base(message)
        {

        }
    }
}
