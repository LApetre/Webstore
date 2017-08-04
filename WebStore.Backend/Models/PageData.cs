﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebStore.Backend.Models
{
    public class PageData<T>
    {
        public int Size { get; set; }
        public IList<T> Data { get; set; }
    }
}