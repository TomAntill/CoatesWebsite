using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoatesWebsite.Exceptions
{
    public class FileNameAlreadyExistsException : Exception
    {
        public FileNameAlreadyExistsException (string message) : base(message)
        {

        }
    }
}
