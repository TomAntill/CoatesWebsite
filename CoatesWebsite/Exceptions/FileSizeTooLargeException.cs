﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoatesWebsite.Exceptions
{
    public class FileSizeTooLargeException : Exception
    {
        public FileSizeTooLargeException(string message) : base(message)
        {

        }
    }
}
